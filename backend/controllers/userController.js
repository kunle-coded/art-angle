const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { Buyer, Artist, User } = require("../models/users");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");
const { deleteFileFromS3 } = require("../utils/deleteFileFromS3");

// @desc Register a new user
// route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, userType } = req.body;
  const userData = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User with email already exist");
  }

  if (userType === "artist") {
    const user = new Artist(userData);
    await user.save();
    // generateToken(res, registeredUser.id);
    res.status(201).json({ message: "Registration successful" });
  } else {
    const user = new Buyer(userData);
    await user.save();
    // generateToken(res, registeredUser.id);
    res.status(201).json({ message: "Registration successful" });
  }
});

// @desc Auth user/set token
// route POST /api/user/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user.id);
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      userType: user.userType,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Logout user
// route GET /api/user/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logeed out" });
});

// @desc Get user profile/set token
// route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user.userType === "artist") {
    const artist = await Artist.findById(user.id)
      .populate("artworks", "-owner")
      .populate("orders", "-owner")
      .populate("followers", "-cart -email -userType -orders -offers -__t")
      .exec();
    res.status(200).json(artist);
  } else {
    const buyer = await Buyer.findById(user.id)
      .populate("orders", "-owner")
      .populate("offers", "-owner")
      .populate("favorites", "-owner")
      .populate("collections", "-owner")
      .populate("cart", "-owner")
      .populate(
        "following",
        "-paymentDetails -email -userType -contactNumber -__t"
      )
      .exec();

    res.json(buyer);
  }
});

// @desc Update user profile
// route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (Object.keys(req.body).length === 0) {
    res.status(401);
    throw new Error("No user data to update");
  }

  const userData = { ...req.body };

  const { password } = req.body;

  if (password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    userData.password = hashedPassword;
  }

  if (user.userType === "artist") {
    await Artist.findOneAndUpdate(
      { _id: user.id },
      { $set: userData },
      { new: true }
    );
    res.status(201).json({ message: "Successfully updated" });
  } else {
    await Buyer.findOneAndUpdate(
      { _id: user.id },
      { $set: userData },
      { new: true }
    );
    res.status(201).json({ message: "Successfully updated" });
  }
});

// @desc Upload image
// route POST /api/user/upload
// @access Private
const uploadFile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const file = req.file;

  if (!req.file) {
    res.status(401);
    throw new Error("No file to upload");
  }

  let imageToDelete;
  if (user.profileImageUrl && user.profileImageUrl.trim()) {
    imageToDelete = user.profileImageUrl.split("com/")[1];
  }

  if (imageToDelete) {
    await deleteFileFromS3(imageToDelete);
  }

  const imgUrl = await uploadFileToS3("users", file, user.id);

  user.profileImageUrl = imgUrl;
  await user.save();
  res.status(201).json({ message: "Successfully uploaded" });
});

// @desc Delete user
// route DELETE /api/user/deactivate
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized user or user not in database");
  }

  const userId = req.user.id;
  const email = req.user.email;

  const userExist = await User.findOne({ email });

  if (userExist) {
    await User.findByIdAndDelete(userId);
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Account successfully deactivated" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadFile,
  deleteUser,
};

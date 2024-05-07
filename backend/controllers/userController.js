const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { Buyer, Artist, User } = require("../models/users");

// @desc Register a new user
// route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, userType } = req.body;
  const userData = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  if (userType === "artist") {
    const user = new Artist(userData);
    const registeredUser = await user.save();
    generateToken(res, registeredUser.id);
    res.status(201).json(registeredUser);
  } else {
    const user = new Buyer(userData);
    const registeredUser = await user.save();
    generateToken(res, registeredUser.id);
    res.status(201).json(registeredUser);
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
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Logout user
// route POST /api/user/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "User logeed out" });
});

// @desc Get user profile/set token
// route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user.userType === "artist") {
    const artist = await Artist.findById(user.id)
      .populate("artworks", "-owner")
      .exec();
    res.status(200).json(artist);
  } else {
    const buyer = await Buyer.findById(user.id)
      .populate("orders", "-id")
      .exec();
    console.log(buyer.orders);

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

  if (user) {
    const { password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { ...req.body };
    userData.password = hashedPassword;

    if (user.userType === "artist") {
      const updatedUser = await Artist.findOneAndUpdate(
        { _id: user.id },
        { $set: userData },
        { new: true }
      );
      res.status(201).json(updatedUser);
    } else {
      const updatedUser = await Buyer.findOneAndUpdate(
        { _id: user.id },
        { $set: userData },
        { new: true }
      );
      res.status(201).json(updatedUser);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Delete user
// route DELETE /api/user/deactivate
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Aunthorized user or user not in database");
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
    res.json({ message: "User successfully deleted" });
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
  deleteUser,
};

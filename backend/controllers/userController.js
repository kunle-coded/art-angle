const asyncHandler = require("express-async-handler");
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
// route POST /api/user/auth
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
  // const user = await User.find({});
  // res.json(user);
  res.json({ message: "User profile" });
});

// @desc Update user profile
// route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.json({ message: "Update user profile" });
});

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

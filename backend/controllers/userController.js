const asyncHandler = require("express-async-handler");
const User = require("../models/users");

// @desc Register a new user
// route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  const savedUser = await user.save();
  res.status(200).json(savedUser);
});

// @desc Auth user/set token
// route POST /api/user/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  res.json({ message: "Auth user" });
});

// @desc Logout user
// route POST /api/user/auth
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: "Logout user" });
});

// @desc Get user profile/set token
// route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
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

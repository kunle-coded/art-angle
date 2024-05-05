const asyncHandler = require("express-async-handler");
const artworks = require("../data");

// @desc Get all artworks
// route GET /api/artworks
// access Public
const getArtworks = asyncHandler(async (req, res) => {
  res.status(200).json({ artworks });
});

// @desc Get all user's artworks
// route GET /api/artworks
// access Private
const getUserArtworks = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "User artworks" });
});

// @desc Add an artwork
// route POST /api/artworks
// access Private
const addArtworks = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Artwork added successfully" });
});

// @desc Update an artwork
// route PUT /api/artworks
// access Private
const updateArtworks = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Artwork successfully updated" });
});

module.exports = {
  getArtworks,
  addArtworks,
  getUserArtworks,
  updateArtworks,
};

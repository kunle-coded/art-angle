const asyncHandler = require("express-async-handler");
const Artwork = require("../models/artworks");
const { Artist, User } = require("../models/users");
const { emptyObject } = require("../utils/helpers");

// @desc Get all artworks
// route GET /api/artworks
// access Public
const getArtworks = asyncHandler(async (req, res) => {
  const artworks = await Artwork.find({}).select("-owner");
  res.status(200).json({ artworks });
});

// @desc Get all user's artworks
// route GET /api/user/artworks
// access Private
const getUserArtworks = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.userType === "artist") {
    const artist = await Artist.findById(user.id)
      .populate("artworks", "-owner")
      .exec();
    const artworks = artist.artworks;
    res.status(200).json(artworks);
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

// @desc Add an artwork
// route POST /api/artworks
// access Private
const addArtworks = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const artworkData = { ...req.body, owner: user.id };
  const artwork = new Artwork(artworkData);
  const savedArtwork = await artwork.save();

  await Artist.findByIdAndUpdate(
    user.id,
    { $push: { artworks: savedArtwork.id } },
    { new: true }
  );

  res.status(201).json(savedArtwork);
});

// @desc Update an artwork
// route PUT /api/artworks/id
// access Private
const updateArtworks = asyncHandler(async (req, res) => {
  emptyObject(res, req.body);

  const userId = req.user;
  const user = await User.findById(userId);

  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const artworkId = req.params.id;
  const newArtworkData = req.body;

  const artwork = await Artwork.findById(artworkId);

  if (artwork) {
    if (artwork.owner.equals(user.id)) {
      const updatedArtwork = await Artwork.findOneAndUpdate(
        { _id: artworkId },
        { $set: newArtworkData },
        { new: true }
      );
      res.status(201).json(updatedArtwork);
    } else {
      res.status(401);
      throw new Error("Unauthorized owner");
    }
  } else {
    res.status(404);
    throw new Error("Artwork not found");
  }
});

// @desc Delete an artwork
// route PUT /api/artworks/id
// access Private
const deleteArtworks = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const artworkId = req.params.id;
  const artworkExist = await Artwork.findById(artworkId);

  if (artworkExist) {
    if (artworkExist.owner.equals(user.id)) {
      await Artwork.findByIdAndDelete(artworkId);
      res.status(200).json({ message: "Artwork successfully deleted" });
    } else {
      res.status(401);
      throw new Error("Unauthorized owner");
    }
  } else {
    res.status(404);
    throw new Error("Artwork not found");
  }
});

module.exports = {
  getArtworks,
  getUserArtworks,
  addArtworks,
  updateArtworks,
  deleteArtworks,
};

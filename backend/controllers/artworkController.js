const asyncHandler = require("express-async-handler");
const Artwork = require("../models/artworks");
const { Artist, User } = require("../models/users");
const { emptyObject } = require("../utils/helpers");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");

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

// @desc Get user's single artwork
// route GET /api/user/artworks/id
// access Private
const getUserSingleArtwork = asyncHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId);

  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const artworkId = req.params.id;

  const artwork = await Artwork.findById(artworkId).lean();

  if (artwork.owner.toString() === user.id) {
    delete artwork.owner;
    delete artwork._id;
    delete artwork.__v;
    res.status(200).json(artwork);
  } else {
    res.status(403);
    throw new Error("You do not have permission to access this artwork");
  }
});

// @desc Add an artwork
// route POST /api/user/artworks/upload
// access Private
const addArtworks = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const artworkTitle = req.body.title;

  const artworkExist = await Artwork.findOne({ title: artworkTitle });

  if (artworkExist) {
    res.status(401);
    throw new Error("Artwork with the same name already exist");
  }

  const artworkData = {
    ...req.body,
    artist:
      user.userType === "admin"
        ? req.body.artist
        : `${user.firstname} ${user.lastname}`,
    owner: user.id,
  };
  const artwork = new Artwork(artworkData);
  const savedArtwork = await artwork.save();

  await Artist.findByIdAndUpdate(
    user.id,
    { $push: { artworks: savedArtwork.id } },
    { new: true }
  );

  res.status(201).json(savedArtwork.id);
});

// @desc Upload artwork image
// route POST /api/user/artworks/image/upload
// @access Private
const uploadArtworkImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const file = req.file;

  if (!req.file) {
    res.status(401);
    throw new Error("No file to upload");
  }

  // let imageToDelete;
  // if (user.profileImageUrl && user.profileImageUrl.trim()) {
  //   imageToDelete = user.profileImageUrl.split("com/")[1];
  // }

  // if (imageToDelete) {
  //   await deleteFileFromS3(imageToDelete);
  // }

  const imageUrl = await uploadFileToS3("artworks", file);

  // user.profileImageUrl = imgUrl;
  // await user.save();
  res.status(201).json({ url: imageUrl });
});

// @desc Update an artwork
// route PUT /api/user/artworks/id
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
  getUserSingleArtwork,
  addArtworks,
  uploadArtworkImage,
  updateArtworks,
  deleteArtworks,
};

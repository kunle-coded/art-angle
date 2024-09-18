const asyncHandler = require("express-async-handler");
const Artwork = require("../models/artworks");
const { Artist, User } = require("../models/users");
const {
  emptyObject,
  generateImageName,
  capitalizeFirstChar,
  generateMultipleQueries,
} = require("../utils/helpers");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");
const { deleteFileFromS3 } = require("../utils/deleteFileFromS3");

// @desc Get all artworks
// route GET /api/artworks
// access Public
const getArtworks = asyncHandler(async (req, res) => {
  const artworks = await Artwork.find({}).select("-owner");
  res.status(200).json(artworks);
});

// @desc Get all artworks
// route GET /api/artworks/featured
// access Public
const getFeaturedArtworks = asyncHandler(async (req, res) => {
  const artworks = await Artwork.find({})
    .select("-owner")
    .sort({ price: "descending" })
    .limit(8);

  res.status(200).json(artworks);
});

// @desc Get all artworks
// route GET /api/artworks/price
// access Public
const getArtworksByPrice = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  if (maxPrice && minPrice === undefined) {
    const artworks = await Artwork.find({
      price: { $lte: maxPrice },
    })
      .sort({ price: 1 })
      .select("-owner")
      .limit(6);

    res.status(200).json(artworks);
  } else if (minPrice && maxPrice === undefined) {
    const artworks = await Artwork.find({
      price: { $gte: minPrice },
    })
      .sort({ price: 1 })
      .select("-owner")
      .limit(6);

    res.status(200).json(artworks);
  } else {
    const artworks = await Artwork.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .sort({ price: 1 })
      .select("-owner")
      .limit(6);

    res.status(200).json(artworks);
  }
});

// @desc Get all artworks
// route GET /api/artworks/filter
// access Public
const getArtworksByFilter = asyncHandler(async (req, res) => {
  const {
    medium,
    rarity,
    price_range,
    keyword,
    artists,
    size,
    width,
    height,
    ways_to_buy,
    materials,
    locations,
    periods,
    colors,
    sort,
    category,
  } = req.query;

  const query = {};
  const sortOptions = {};

  // Filter artworks by medium
  if (medium) {
    if (medium.includes("+")) {
      const mediumQuery = medium
        .split("+")
        .map((item) => capitalizeFirstChar(item));
      query.medium = { $in: mediumQuery };
    } else {
      query.medium = capitalizeFirstChar(medium);
    }
  }

  // Filter artworks by rarity
  if (rarity) {
    query.editions = capitalizeFirstChar(rarity);
  }

  // Filter artworks by keyword
  if (keyword) {
    query.keywords = keyword;
  }

  // Filter artworks by artist
  if (artists) {
    const artistQuery = generateMultipleQueries(artists);
    query.artist = artistQuery;
  }

  // Filter artworks by price
  if (price_range) {
    const [minPrice, maxPrice] = price_range.split("-");

    const isNotANumber = isNaN(Number(minPrice));

    if (isNotANumber) {
      query.price = { $lte: Number(maxPrice) };
    } else {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
  }

  // Filter artworks by size
  if (size) {
    if (size === "SMALL") {
      query["dimensions.width"] = { $lte: 16 };
      query["dimensions.height"] = { $lte: 16 };
    } else if (size === "MEDIUM") {
      query["dimensions.width"] = { $gte: 16, $lte: 40 };
      query["dimensions.height"] = { $gte: 16, $lte: 40 };
    } else if (size === "LARGE") {
      query["dimensions.width"] = { $gte: 40 };
      query["dimensions.height"] = { $gte: 40 };
    }
  } else {
    if (width) {
      const isSingleValue = width.includes("+");
      const widthRange = width.split("-");

      if (isSingleValue) {
        const minWidth = Number(widthRange[0]);
        query["dimensions.width"] = { $gte: minWidth };
      } else {
        const minWidth = Number(widthRange[0]);
        const maxWidth = Number(widthRange[1]);
        query["dimensions.width"] = { $gte: minWidth, $lte: maxWidth };
      }
    }

    if (height) {
      const isSingleValue = height.includes("+");
      const heightRange = height.split("-");

      if (isSingleValue) {
        const minHeight = Number(heightRange[0]);
        query["dimensions.height"] = { $gte: minHeight };
      } else {
        const minHeight = Number(heightRange[0]);
        const maxHeight = Number(heightRange[1]);
        query["dimensions.height"] = { $gte: minHeight, $lte: maxHeight };
      }
    }
  }

  // Filter artworks by ways to buy
  if (ways_to_buy) {
    query.availability = "For Sale";
  }

  // Filter artworks by materials
  if (materials) {
    const queryValue = generateMultipleQueries(materials);
    query.materials = queryValue;
  }

  // Filter artworks by location
  if (locations) {
    const singleQuery = locations.split(/[+,]/)[0].split("-").join(" ");

    const multipleQuery = locations.includes("+")
      ? locations.split("+").map((location) => {
          return location.split(",")[0].split("-").join(" ");
        })
      : singleQuery;

    if (Array.isArray(multipleQuery)) {
      query["shippingAddress.city"] = { $in: multipleQuery };
    } else {
      query["shippingAddress.city"] = singleQuery;
    }
  }

  // Filter artworks by year published
  if (periods) {
    const year = periods.split(/[s-]/)[0];
    let singleQuery;

    if (year === "late") {
      singleQuery = 1870;
    } else if (year === "mid") {
      singleQuery = 1840;
    } else if (year === "early") {
      singleQuery = 1800;
    } else {
      singleQuery = Number(year);
    }

    const multipleQuery = periods.includes("+")
      ? periods.split("+").map((period) => {
          const year = period.split(/[s-]/)[0];
          let modifiedYear;

          if (year === "late") {
            modifiedYear = 1870;
          } else if (year === "mid") {
            modifiedYear = 1840;
          } else if (year === "early") {
            modifiedYear = 1800;
          } else {
            modifiedYear = Number(year);
          }
          return modifiedYear;
        })
      : singleQuery;

    if (Array.isArray(multipleQuery)) {
      const minYear = Math.min(...multipleQuery);
      const maxYear = Math.max(...multipleQuery);

      query.published = { $gte: minYear, $lte: maxYear };
    } else {
      query.published = { $gte: singleQuery };
    }
  }

  // Filter artworks by colors
  if (colors) {
    const singleQuery = colors.split(/[+-]/).join(" ");

    const multipleQuery = colors.includes("+")
      ? colors.split("+").map((part) => {
          return part.split("-").join(" ");
        })
      : singleQuery;

    query.keywords = Array.isArray(multipleQuery)
      ? { $in: multipleQuery }
      : singleQuery;
  }

  // sort artworks
  if (sort) {
    if (sort === "price-descending") {
      sortOptions.sortBy = "price";
      sortOptions.sortOrder = "desc";
    } else if (sort === "price-ascending") {
      sortOptions.sortBy = "price";
    } else if (sort === "year-descending") {
      sortOptions.sortBy = "published";
      sortOptions.sortOrder = "desc";
    } else if (sort === "year-ascending") {
      sortOptions.sortBy = "published";
    } else {
      sortOptions.sortBy = "createdAt";
      sortOptions.sortOrder = "desc";
    }
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const artworks = await Artwork.find(query)
    .select("-owner")
    .sort(
      sortOptions.sortBy
        ? { [sortOptions.sortBy]: sortOptions.sortOrder === "desc" ? -1 : 1 }
        : {}
    );

  if (artworks.length >= 1) {
    res.status(200).json(artworks);
  } else {
    res.status(401);
    throw new Error("No artwork match the filter query");
  }
});

// @desc Get artworks by categories
// route GET /api/collection/:category
// access Public
const getArtworksByCategories = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const artworks = await Artwork.find({
    category: { $regex: category, $options: "i" },
  }).select("-owner");

  res.status(200).json(artworks);
});

// @desc Get all artworks
// route GET /api/artworks/new
// access Public
const getNewArtworks = asyncHandler(async (req, res) => {
  const artworks = await Artwork.find()
    .select("-owner")
    .sort({ createdAt: -1 })
    .limit(8);

  res.status(200).json(artworks);
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

  const imageUrl = await uploadFileToS3("artworks", file, user.id);
  res.status(201).json({ url: imageUrl });
});

// @desc Delete artwork image
// route DELETE /api/user/artworks/image/:id
// @access Private
const deleteArtworkImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.userType === "buyer") {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const imageKey = req.body.url;
  const artworkId = req.params.id;

  const artwork = await Artwork.findById(artworkId);

  if (artwork) {
    if (artwork.owner.equals(user.id)) {
      const images = artwork.images;

      const imageToDelete = images.find((img) => img === imageKey);

      if (imageToDelete) {
        await deleteFileFromS3(imageToDelete);
        const newImages = artwork.images.filter((img) => img !== imageToDelete);
        artwork.images = newImages;
        await artwork.save();
        res.status(201).json({ message: "Image deleted successfully" });
      }
    } else {
      res.status(403);
      throw new Error("You have no permission to perform this operation");
    }
  }
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
  const images = newArtworkData.images;

  if (images) {
    // const imageToAdd = images.filter((img) => img !== "");
    // const oldImages = [...artwork.images];

    newArtworkData.images = [...artwork.images, ...images];
  }

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
      const images = artworkExist.images;

      images.forEach(async (image) => {
        if (image) {
          await deleteFileFromS3(image);
        }
      });

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
  getFeaturedArtworks,
  getNewArtworks,
  getArtworksByPrice,
  getArtworksByFilter,
  getUserArtworks,
  getUserSingleArtwork,
  getArtworksByCategories,
  addArtworks,
  uploadArtworkImage,
  deleteArtworkImage,
  updateArtworks,
  deleteArtworks,
};

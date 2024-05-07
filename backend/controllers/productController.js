const asyncHandler = require("express-async-handler");
const { Buyer, Artist, User } = require("../models/users");
const Artwork = require("../models/artworks");

// @desc Order Product
// route PUT /api/product/order
// @access Private
const makeOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  const product = await Artwork.findById(productId);
  const order = {
    id: product.id,
    status: "in progress",
  };

  if (product) {
    const user = await Buyer.findByIdAndUpdate(
      userId,
      { $push: { orders: order } },
      { new: true }
    );
    // console.log(user);
    res.status(201).json(user);
  }
});

// @desc Order Product
// route PUT /api/product/save
// @access Private
const addToWishlist = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Item added to wishlist" });
});

// @desc Add to cart
// route PUT /api/product/buy
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Item added to cart" });
});

// @desc Favourite Artist
// route PUT /api/product/favourite
// @access Private
const addToFavouriteArtsist = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Artist added to favourite" });
});

module.exports = {
  makeOrder,
  addToCart,
  addToWishlist,
  addToFavouriteArtsist,
};

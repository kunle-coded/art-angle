const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { Buyer, Artist, User } = require("../models/users");
const Artwork = require("../models/artworks");

// @desc Add Product to wishlist
// route PUT /api/product/save
// @access Private
const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  const buyer = await Buyer.findById(userId).lean();

  const isInList = buyer.wishlist.some((orderItemId) =>
    orderItemId.equals(productId)
  );

  if (isInList) {
    res.status(400).json({ message: "Artwork already in wishlist" });
    return;
  }

  await Buyer.findByIdAndUpdate(
    userId,
    { $push: { wishlist: productId } },
    { new: true }
  );
  res.status(201).json({ message: "Artwork successfully added to wishlist" });
});

// @desc Add to cart
// route PUT /api/product/buy
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  try {
    const product = await Artwork.findById(productId).lean();

    if (!product) {
      res.status(404).json({ message: "Artwork not found" });
      return;
    }

    const buyer = await Buyer.findById(userId).lean();

    // Check if the cart already includes the productId
    const isInCart = buyer.cart.some((cartItemId) =>
      cartItemId.equals(productId)
    );

    if (isInCart) {
      res.status(400).json({ message: "Artwork already in your cart" });
      return;
    }

    await Buyer.findByIdAndUpdate(
      userId,
      { $push: { cart: productId } },
      { new: true }
    );

    res.status(201).json({ message: "Artwork successfully added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Checkout cart
// route POST /api/checkout
// @access Private
const checkout = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const buyer = await Buyer.findById(userId);

  if (buyer.cart.length < 1) {
    res.status(401).json({ message: "Your cart is empty" });
    return;
  }

  for (const item of buyer.cart) {
    // const isInList = buyer.orders.includes(item);

    const isInList = buyer.orders.some((orderItemId) =>
      orderItemId.equals(item)
    );

    if (!isInList) {
      const date = new Date();

      const orderDetails = {
        orderId: uuidv4(),
        productId: item,
        orderDate: date.toLocaleDateString("DE"),
        status: "in progress",
      };

      try {
        await Buyer.findByIdAndUpdate(
          userId,
          { $push: { orders: item }, $pull: { cart: item } },
          { new: true }
        );

        buyer.orderDetails.push(orderDetails);
        await buyer.save();
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  res.status(201).json({ message: "Checkout successful" });
});

// @desc Delete item from list
// route DELETE /api/artwork/remove/id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const artworkId = req.params.id;

  const artwork = await Artwork.findById(artworkId).lean();

  if (artwork) {
    let listItem = req.query.list;

    const buyer = await Buyer.findById(userId).lean();

    if (buyer[listItem].length < 1) {
      res.status(401);
      throw new Error(`${listItem} is empty`);
    }

    const isInList = buyer[listItem].find(
      (item) => item.toString() === artworkId
    );

    if (isInList) {
      const update = {
        $pull: {},
      };
      update.$pull[listItem] = artwork.id;

      const user = await Buyer.findByIdAndUpdate(userId, update, { new: true });

      res.status(201).json({
        message: `Artwork successfully removed from your ${listItem}`,
      });
    } else {
      res.status(400).json({ message: `Artwork not in your ${listItem}` });
    }
  } else {
    res.status(404).json({ message: "Artwork not found" });
  }
});

module.exports = {
  addToCart,
  addToWishlist,
  checkout,
  deleteItem,
};

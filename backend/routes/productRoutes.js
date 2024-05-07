const router = require("express").Router();
const {
  makeOrder,
  addToCart,
  addToWishlist,
  addToFavouriteArtsist,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.put("/order/:id", protect, makeOrder);
router.put("/buy/:id", protect, addToCart);
router.put("/save/:id", protect, addToWishlist);
router.put("/favourite/:id", protect, addToFavouriteArtsist);

module.exports = router;

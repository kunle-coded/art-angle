const router = require("express").Router();
const {
  addToCart,
  addToWishlist,
  addToFavouriteArtsist,
  deleteItem,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.put("/buy/:id", protect, addToCart);
router.put("/save/:id", protect, addToWishlist);
router.delete("/remove/:id", protect, deleteItem);

module.exports = router;

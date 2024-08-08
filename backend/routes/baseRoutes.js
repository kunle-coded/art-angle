const router = require("express").Router();
const {
  getArtworks,
  getFeaturedArtworks,
  getNewArtworks,
  getArtworksByPrice,
} = require("../controllers/artworkController");
const { checkout } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/artworks", getArtworks);
router.get("/artworks/featured", getFeaturedArtworks);
router.get("/artworks/new", getNewArtworks);
router.get("/artworks/price", getArtworksByPrice);
router.put("/checkout", protect, checkout);

module.exports = router;

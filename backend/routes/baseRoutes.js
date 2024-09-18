const router = require("express").Router();
const {
  getArtworks,
  getFeaturedArtworks,
  getNewArtworks,
  getArtworksByPrice,
  getArtworksByFilter,
  getArtworksByCategories,
} = require("../controllers/artworkController");
const { checkout } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/artworks", getArtworks);
router.get("/artworks/featured", getFeaturedArtworks);
router.get("/artworks/new", getNewArtworks);
router.get("/artworks/price", getArtworksByPrice);
router.get("/artworks/filter", getArtworksByFilter);
router.get("/collection/:category", getArtworksByCategories);
router.put("/checkout", protect, checkout);

module.exports = router;

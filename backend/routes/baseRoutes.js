const router = require("express").Router();
const { getArtworks } = require("../controllers/artworkController");
const { checkout } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/artworks", getArtworks);
router.put("/checkout", protect, checkout);

module.exports = router;

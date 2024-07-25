const router = require("express").Router();
const {
  addArtworks,
  getUserArtworks,
  updateArtworks,
  deleteArtworks,
  getUserSingleArtwork,
} = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.get("/", protect, getUserArtworks);
router.get("/:id", protect, getUserSingleArtwork);
router.post("/upload", protect, addArtworks);
router
  .route("/:id")
  .put(protect, updateArtworks)
  .delete(protect, deleteArtworks);

module.exports = router;

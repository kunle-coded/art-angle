const router = require("express").Router();
const {
  addArtworks,
  getUserArtworks,
  updateArtworks,
  deleteArtworks,
} = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.get("/", protect, getUserArtworks);
router.post("/upload", protect, addArtworks);
router
  .route("/:id")
  .put(protect, updateArtworks)
  .delete(protect, deleteArtworks);

module.exports = router;

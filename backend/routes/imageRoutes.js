const router = require("express").Router();
const {
  uploadArtworkImage,
  deleteArtworkImage,
} = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.post("/upload", protect, upload.single("file"), uploadArtworkImage);
router.delete("/:id", protect, deleteArtworkImage);

module.exports = router;

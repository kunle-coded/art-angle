const router = require("express").Router();
const { uploadArtworkImage } = require("../controllers/artworkController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.post("/upload", protect, upload.single("file"), uploadArtworkImage);

module.exports = router;

const router = require("express").Router();
const { getArtworks } = require("../controllers/artworkController");

router.get("/artworks", getArtworks);

module.exports = router;

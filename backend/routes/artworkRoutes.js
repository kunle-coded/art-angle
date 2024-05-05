const router = require("express").Router();
const {
  getArtworks,
  addArtworks,
  getUserArtworks,
  updateArtworks,
} = require("../controllers/artworkController");

router.get("/artworks", getArtworks);
router
  .route("/user/artworks")
  .get(getUserArtworks)
  .post(addArtworks)
  .put(updateArtworks);

module.exports = router;

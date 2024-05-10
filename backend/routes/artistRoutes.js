const router = require("express").Router();
const { addToFavouriteArtsist } = require("../controllers/artistController");
const { protect } = require("../middleware/authMiddleware");

router.put("/favourite/:id", protect, addToFavouriteArtsist);

module.exports = router;

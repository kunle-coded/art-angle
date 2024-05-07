const router = require("express").Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.delete("/deactivate", protect, deleteUser);

module.exports = router;

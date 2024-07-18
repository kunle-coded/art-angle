const router = require("express").Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  deleteUser,
  uploadFile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

router.post("/register", registerUser);
router.post("/auth", authUser);
router.get("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/upload", protect, upload.single("file"), uploadFile);
router.delete("/deactivate", protect, deleteUser);

module.exports = router;

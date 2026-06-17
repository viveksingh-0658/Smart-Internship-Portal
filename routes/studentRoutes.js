const express = require("express");
const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  getMyApplications,
} = require("../controllers/studentController");

// Student Only Routes

router.get(
  "/profile",
  protect,
  authorize("student"),
  getProfile
);

router.put(
  "/profile",
  protect,
  authorize("student"),
  updateProfile
);

router.get(
  "/applications",
  protect,
  authorize("student"),
  getMyApplications
);

module.exports = router;
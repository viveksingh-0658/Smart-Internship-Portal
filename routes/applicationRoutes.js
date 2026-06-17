const express = require("express");
const router = express.Router();

const {
  applyInternship,
  getApplications,
  getCompanyApplications,
  acceptApplication,
  rejectApplication,
  getMyApplications
} = require("../controllers/applicationController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Student Apply Internship
router.post(
  "/apply",
  protect,
  authorize("student"),
  applyInternship
);

// Student My Applications
router.get(
  "/my-applications",
  protect,
  authorize("student"),
  getMyApplications
);

// Company View Own Applicants
router.get(
  "/company",
  protect,
  authorize("company"),
  getCompanyApplications
);

// Admin View All Applications
router.get(
  "/",
  protect,
  authorize("admin"),
  getApplications
);

// Company Accept Application
router.put(
  "/:id/accept",
  protect,
  authorize("company"),
  acceptApplication
);

// Company Reject Application
router.put(
  "/:id/reject",
  protect,
  authorize("company"),
  rejectApplication
);

module.exports = router;
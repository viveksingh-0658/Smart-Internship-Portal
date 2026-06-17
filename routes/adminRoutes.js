const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getDashboardStats,
  getAllStudents,
  getAllCompanies,
  getAllInternships,
  getAllApplications,
  deleteStudent,
  deleteCompany,
  deleteInternship,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Login (Public)
router.post("/login", loginAdmin);

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

// View Data
router.get(
  "/students",
  protect,
  authorize("admin"),
  getAllStudents
);

router.get(
  "/companies",
  protect,
  authorize("admin"),
  getAllCompanies
);

router.get(
  "/internships",
  protect,
  authorize("admin"),
  getAllInternships
);

router.get(
  "/applications",
  protect,
  authorize("admin"),
  getAllApplications
);

// Delete Data
router.delete(
  "/student/:id",
  protect,
  authorize("admin"),
  deleteStudent
);

router.delete(
  "/company/:id",
  protect,
  authorize("admin"),
  deleteCompany
);

router.delete(
  "/internship/:id",
  protect,
  authorize("admin"),
  deleteInternship
);

module.exports = router;
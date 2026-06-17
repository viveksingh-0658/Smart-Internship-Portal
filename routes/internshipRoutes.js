const express = require("express");
const router = express.Router();

const {
protect,
authorize,
} = require("../middleware/authMiddleware");

const {
createInternship,
getInternships,
getInternshipById,
getCompanyInternships,
updateInternship,
deleteInternship,
} = require("../controllers/internshipController");

// ======================
// Public Routes
// ======================

router.get("/", getInternships);

// ======================
// Company Routes
// ======================

router.get(
"/company/my-internships",
protect,
authorize("company"),
getCompanyInternships
);

router.post(
"/create",
protect,
authorize("company"),
createInternship
);

router.put(
"/:id",
protect,
authorize("company"),
updateInternship
);

router.delete(
"/:id",
protect,
authorize("company"),
deleteInternship
);

// ======================
// Get Internship By ID
// (Always keep at bottom)
// ======================

router.get("/:id", getInternshipById);

module.exports = router;


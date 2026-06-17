// const express = require("express");
// const router = express.Router();

// const {
//   registerCompany,
//   loginCompany,
// } = require("../controllers/companyController");

// router.post("/register", registerCompany);
// router.post("/login", loginCompany);

// module.exports = router;


const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/profile",
  protect,
  authorize("company"),
  companyController.getCompanyProfile
);

// Public Routes
router.post(
  "/register",
  companyController.registerCompany
);

router.post(
  "/login",
  companyController.loginCompany
);

// Company Only Routes
router.get(
  "/internships",
  protect,
  authorize("company"),
  companyController.getMyInternships
);

module.exports = router;
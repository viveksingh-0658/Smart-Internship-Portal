const Company = require("../models/Company");
const Internship = require("../models/Internship");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Company
const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      industry,
      location,
      description,
    } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Company Name, Email and Password are required",
      });
    }

    const existingCompany = await Company.findOne({
      email,
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const company = await Company.create({
      companyName,
      email,
      password: hashedPassword,
      industry,
      location,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Company Registered Successfully",
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email,
      },
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Company
const loginCompany = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const company = await Company.findOne({
      email,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      company.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: company._id,
        role: "company",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email,
        industry: company.industry,
        location: company.location,
      },
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Company - View Own Internships
const getMyInternships = async (req, res) => {
  try {

    const internships = await Internship.find({
      company: req.user.id,
    });

    return res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });

  } catch (error) {

    console.error("INTERNSHIP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Company Profile
const getCompanyProfile = async (req, res) => {
  try {

    const company = await Company.findById(
      req.user.id
    ).select("-password");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  registerCompany,
  loginCompany,
  getMyInternships,
  getCompanyProfile,
};
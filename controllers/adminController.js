
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Company = require("../models/Company");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Admin Login Successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const companies = await Company.countDocuments();
    const internships = await Internship.countDocuments();
    const applications = await Application.countDocuments();

    res.status(200).json({
      students,
      companies,
      internships,
      applications,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// All Students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");

    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// All Companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select("-password");

    res.status(200).json(companies);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// All Internships
const getAllInternships = async (req, res) => {
  try {
    const internships =
      await Internship.find().populate(
        "company",
        "companyName email"
      );

    res.status(200).json(internships);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// All Applications
const getAllApplications = async (req, res) => {
  try {
    const applications =
      await Application.find()
        .populate("student", "name email")
        .populate("internship", "title");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Company
const deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Company Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Internship
const deleteInternship = async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Internship Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  getDashboardStats,
  getAllStudents,
  getAllCompanies,
  getAllInternships,
  getAllApplications,
  deleteStudent,
  deleteCompany,
  deleteInternship,
};
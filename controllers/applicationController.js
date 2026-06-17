const Application = require("../models/Application");
const Internship = require("../models/Internship");
const mongoose = require("mongoose");

// Apply Internship
const applyInternship = async (req, res) => {
  try {
    console.log("===== APPLY API HIT =====");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const { internshipId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
      return res.status(400).json({
        message: "Invalid Internship ID",
      });
    }

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    const existingApplication = await Application.findOne({
      student: req.user.id,
      internship: internshipId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this internship",
      });
    }

    const application = await Application.create({
      student: req.user.id,
      internship: internshipId,
    });

    return res.status(201).json({
      success: true,
      message: "Application Submitted Successfully",
      application,
    });

  } catch (error) {
    console.error("APPLICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Student - My Applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    }).populate(
      "internship",
      "title company location stipend duration"
    );

    return res.status(200).json(applications);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - View All Applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student")
      .populate("internship");

    return res.status(200).json(applications);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Company - View Own Applicants
const getCompanyApplications = async (req, res) => {
  try {
    const internships = await Internship.find({
      company: req.user.id,
    });

    const internshipIds = internships.map(
      internship => internship._id
    );

    const applications = await Application.find({
      internship: {
        $in: internshipIds,
      },
    })
      .populate(
        "student",
        "name email college skills"
      )
      .populate(
        "internship",
        "title location"
      );

    return res.status(200).json(applications);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Accept Application
const acceptApplication = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Accepted";

    await application.save();

    return res.status(200).json({
      message: "Application Accepted",
      application,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Reject Application
const rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Rejected";

    await application.save();

    return res.status(200).json({
      message: "Application Rejected",
      application,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyInternship,
  getMyApplications,
  getApplications,
  getCompanyApplications,
  acceptApplication,
  rejectApplication,
};
const Student = require("../models/Student");
const Application = require("../models/Application");

// Get Student Profile
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Student Profile
const updateProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    student.name =
      req.body.name || student.name;

    student.college =
      req.body.college || student.college;

    student.skills =
      req.body.skills || student.skills;

    student.resume =
      req.body.resume || student.resume;

    await student.save();

    res.status(200).json({
      message: "Profile Updated Successfully",
      student,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate("internship");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getMyApplications,
};
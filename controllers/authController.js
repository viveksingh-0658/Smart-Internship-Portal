const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

console.log("Student Model:", Student);

// Register Student
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, college, skills } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      college,
      skills,
    });

    await student.save();

    res.status(201).json({
      message: "Student Registered Successfully",
    });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// module.exports = {
//   registerStudent,
// };



const jwt = require("jsonwebtoken");

// Login Student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
};
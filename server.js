// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// /////const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// // Connect MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/users", userRoutes);

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Smart Internship Portal Server 🚀");
// });

// // Port
// const PORT = process.env.PORT || 8000;

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



//project

// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const studentRoutes = require("./routes/studentRoutes");

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const internshipRoutes = require("./routes/internshipRoutes");
// const companyRoutes = require("./routes/companyRoute");
// const applicationRoutes = require("./routes/applicationRoutes");
// app.use("/api/student", studentRoutes);

// // Load Environment Variables
// dotenv.config();

// // Connect Database
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/company", companyRoutes);
// app.use("/api/internships", internshipRoutes);
// app.use("/api/applications", applicationRoutes);

// // Home Route
// app.get("/", (req, res) => {
//   res.send("Smart Internship Portal Backend Running");
// });

// // Test Route
// app.get("/test", (req, res) => {
//   res.send("Test Route Working");
// });

// // Server Port
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const companyRoutes = require("./routes/companyRoute");
const applicationRoutes = require("./routes/applicationRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Smart Internship Portal Backend Running");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("Test Route Working");
});

// Server Port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
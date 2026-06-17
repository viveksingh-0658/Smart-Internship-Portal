const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    stipend: {
      type: String,
    },

    duration: {
      type: String,
    },

    skillsRequired: {
      type: [String],
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);
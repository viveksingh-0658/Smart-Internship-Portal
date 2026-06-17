const Internship = require("../models/Internship");
const mongoose = require("mongoose");

// Create Internship
const createInternship = async (req, res) => {
try {


if (req.user.role !== "company") {
  return res.status(403).json({
    message: "Only companies can create internships",
  });
}

const {
  title,
  location,
  stipend,
  duration,
  skillsRequired,
  description,
} = req.body;

if (!title || !location) {
  return res.status(400).json({
    message: "Title and Location are required",
  });
}

const internship = new Internship({
  title,
  location,
  stipend,
  duration,
  skillsRequired,
  description,
  company: req.user.id,
});

await internship.save();

res.status(201).json({
  message: "Internship Created Successfully",
  internship,
});


} catch (error) {


console.error(error);

res.status(500).json({
  message: error.message,
});


}
};

// Get All Internships
const getInternships = async (req, res) => {
try {


const internships = await Internship.find()
  .populate(
    "company",
    "companyName email"
  );

res.status(200).json(internships);


} catch (error) {


console.error(error);

res.status(500).json({
  message: error.message,
});


}
};

// Get Internship By ID
const getInternshipById = async (req, res) => {
try {


const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    message: "Invalid Internship ID",
  });
}

const internship = await Internship.findById(id)
  .populate(
    "company",
    "companyName email"
  );

if (!internship) {
  return res.status(404).json({
    message: "Internship not found",
  });
}

res.status(200).json(internship);

} catch (error) {


console.error(error);

res.status(500).json({
  message: error.message,
});


}
};

// Company - My Internships
const getCompanyInternships = async (req, res) => {
try {


const internships = await Internship.find({
  company: req.user.id,
});

res.status(200).json(internships);


} catch (error) {


console.error(error);

res.status(500).json({
  message: error.message,
});


}
};

// Update Internship
const updateInternship = async (req, res) => {
try {


const internship =
  await Internship.findById(req.params.id);

if (!internship) {
  return res.status(404).json({
    message: "Internship not found",
  });
}

if (
  internship.company.toString() !==
  req.user.id
) {
  return res.status(403).json({
    message: "Not authorized",
  });
}

const updated =
  await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

res.status(200).json(updated);


} catch (error) {


console.error(error);

res.status(500).json({
  message: error.message,
});


}
};

// Delete Internship
const deleteInternship = async (req, res) => {
try {


const internship =
  await Internship.findById(req.params.id);

if (!internship) {
  return res.status(404).json({
    message: "Internship not found",
  });
}

if (
  internship.company.toString() !==
  req.user.id
) {
  return res.status(403).json({
    message: "Not authorized",
  });
}

await Internship.findByIdAndDelete(
  req.params.id
);

res.status(200).json({
  message:
    "Internship Deleted Successfully",
});


} catch (error) {


console.error(error);

res.status(500).json({
  message: error.message,
});


}
};

module.exports = {
createInternship,
getInternships,
getInternshipById,
getCompanyInternships,
updateInternship,
deleteInternship,
};

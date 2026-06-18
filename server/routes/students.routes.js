const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Student = require("../models/Students.model");

router.get("/", async (req, res, next) => { // returns all students.
  try {
    const response = await Student.find().populate("cohort"); // The student document only stores the cohort ObjectId. Populate replaces that ObjectId with the actual Cohort document.
    res.json(response);
  } catch (error) {
    next(error)
  }
});

router.get("/cohort/:cohortId", async (req, res, next) => { // returns all students belonging to be a specific cohort.
  try {
    const response = await Student.find({
      cohort: req.params.cohortId, // Find students whose cohort field matches the cohortId.
    }).populate("cohort");
    res.json(response);
  } catch (error) {
    next(error)
  }
});

router.get("/:studentId", async (req, res, next) => { // Returns a single student.
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort",
    );
    res.json(response);
  } catch (error) {
    next(error)
  }
});

router.post("/", async (req, res, next) => { // Creates a new student document.
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;
  try {
    const newStudent = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    };
    const response = await Student.create(newStudent);
    res.json(response);
  } catch (error) {
    next(error)
  }
});

router.put("/:studentId", async (req, res, next) => { // Updates an existing studnet document.
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;
  try {
    const updatedStudent = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    };
    console.log(updatedStudent);
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      updatedStudent,
      { returnDocument: "after", runValidators: true },
    );
    res.json(response);
  } catch (error) {
    next(error)
  }
});

router.delete("/:studentId", async (req, res, next) => { // Deletes a student from the database.
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    next(error)
  }
});

module.exports = router
const Student = require("../schemas/Student.model");
const express = require("express");

const studentRouter = express.Router();

studentRouter.post("/api/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.program,
    image: req.body.image,
    Cohort: req.body.Cohort,
    projects: req.body.projects,
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create the student" });
    });
});

studentRouter.get("/api/students", (req, res) => {
  Student.find()
    .populate("Cohort")
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) =>
      res.status(500).json({ error: "Failed to retrieve students" })
    );
});

studentRouter.get("/api/students/cohort/:cohortId", (req, res) => {
  Cohort.findById(req.params.id)
    .populate("Cohort")
    .then((studentInCohort) => {
      res.status(200).json(studentInCohort);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting student from cohort",
      });
    });
});

studentRouter.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.id)
    .populate("Cohort")
    .then((studentById) => {
      res.status(200).json(studentById);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting student",
      });
    });
});

studentRouter.put("/api/students/:studentsId", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedStudent) => {
      res.status(200).json(updatedStudent);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while updating student",
      });
    });
});

studentRouter.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while deleting cohort",
      });
    });
});
module.exports = studentRouter;

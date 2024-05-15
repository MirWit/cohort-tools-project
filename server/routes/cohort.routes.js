const Cohort = require("../schemas/Cohort.model");
const express = require("express");

const cohortRouter = express.Router();

cohortRouter.post("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((createdCohort) => {
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create the cohort" });
    });
});

cohortRouter.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((allCohorts) => {
      res.status(200).json({ allCohorts });
    })
    .catch((error) =>
      res.status(500).json({ error: "Failed to retrieve cohorts" })
    );
});

cohortRouter.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.id)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting cohort",
      });
    });
});

cohortRouter.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedCohort) => {
      res.status(200).json(updatedCohort);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while updating cohort",
      });
    });
});

cohortRouter.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while deleting cohort",
      });
    });
});
module.exports = cohortRouter;

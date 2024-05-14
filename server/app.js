const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require("./cohorts.json");
const Cohort = require("./schemas/Cohort.Schema");
const students = require("./students.json");
const Student = require("./schemas/Student.Schema");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5005", "http://example.com"],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// app.get("/", (req, res) => {
//   console.log(req);
// });

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//cohort routes
app.post("/api/cohorts", (req, res) => {
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

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((allCohorts) => {
      res.status(200).json({ allCohorts });
    })
    .catch((error) =>
      res.status(500).json({ error: "Failed to retrieve cohorts" })
    );
});

app.get("/api/cohorts/:cohortId", (req, res) => {
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

app.put("/api/cohorts/:cohortId", (req, res) => {
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

app.delete("/api/cohorts/:cohortId", (req, res) => {
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

//student routes
app.post("/api/students", (req, res) => {
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
    cohort: req.body.cohort,
    projects: req.body.projects,
  })
    .then((createdStudent) => {
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create the student" });
    });
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) =>
      res.status(500).json({ error: "Failed to retrieve students" })
    );
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  Cohort.findById(req.params.id)
    .then((studentInCohort) => {
      res.status(200).json(studentInCohort);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting student from cohort",
      });
    });
});

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.id)
    .then((studentById) => {
      res.status(200).json(studentById);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error getting student",
      });
    });
});

app.put("/api/students/:studentsId", (req, res) => {
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

app.delete("/api/students/:studentId", (req, res) => {
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

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

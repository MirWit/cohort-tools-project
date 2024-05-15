const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5055;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentRouter = require("./routes/student.routes");
const cohortRouter = require("./routes/cohort.routes");
const cors = require("cors");
// const bodyParser = require("body-parser");

// STATIC DATA
const cohorts = require("./cohorts.json");
const Cohort = require("./schemas/Cohort.model");
const students = require("./students.json");
const Student = require("./schemas/Student.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//MIDDLEWARE
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

//DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });
app.use("/", studentRouter);
app.use("/", cohortRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

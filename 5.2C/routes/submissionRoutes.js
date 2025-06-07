const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getSubmissions,
} = require("../controllers/submissionController");

router.post("/submit", createSubmission);
router.get("/submissions", getSubmissions);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  submitForm,
  getAllSubmissions,
} = require("../controllers/submissionController");

router.post("/submit", submitForm);
router.get("/submissions", getAllSubmissions);

module.exports = router;

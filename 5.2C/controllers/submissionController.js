const Submission = require("../models/Submission");

exports.createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json({ success: true, data: submission });
  } catch (error) {
    res.status(500).json({ success: false, message: "Submission failed." });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({}).sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetching failed." });
  }
};

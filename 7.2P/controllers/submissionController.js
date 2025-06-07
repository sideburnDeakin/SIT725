// controllers/submissionController.js
const Submission = require("../models/Submission");

const submitForm = async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();

    // Broadcast new user info
    const io = global._io;
    if (io) {
      io.emit("new-user", {
        name: newSubmission.name,
        interest: newSubmission.interest,
      });
    }

    res.json({ success: true, data: newSubmission  });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ _id: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitForm, getAllSubmissions };

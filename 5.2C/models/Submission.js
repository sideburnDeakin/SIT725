const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  name: String,
  interest: String,
  experience: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", SubmissionSchema);

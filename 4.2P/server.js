const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/gamedevDB", {});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

const SubmissionSchema = new mongoose.Schema({
  name: String,
  interest: String,
  experience: String,
  email: String,
  submittedAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", SubmissionSchema);


app.post("/submit", async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(200).json({ success: true, id: submission._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to save submission." });
  }
});

app.get("/submissions", async (req, res) => {
  try {
    const all = await Submission.find({}).sort({ submittedAt: -1 });
    res.status(200).json(all);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch submissions." });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

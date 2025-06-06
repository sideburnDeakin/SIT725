// seed.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gamedevDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SubmissionSchema = new mongoose.Schema({
  name: String,
  interest: String,
  experience: String,
  email: String,
  submittedAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', SubmissionSchema);

const sampleSubmissions = [
  {
    name: "Alice",
    interest: "VR Game Development",
    experience: "Attended a Unity workshop last year.",
    email: "alice@example.com",
  },
  {
    name: "Bob",
    interest: "2D Pixel Art Games",
    experience: "Self-taught using YouTube and indie tutorials.",
    email: "bob@example.com",
  },
  {
    name: "Charlie",
    interest: "Multiplayer mechanics",
    experience: "Worked on a multiplayer shooter in university.",
    email: "",
  }
];

Submission.insertMany(sampleSubmissions)
  .then(() => {
    console.log("Sample submissions inserted.");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting sample submissions:", err);
  });

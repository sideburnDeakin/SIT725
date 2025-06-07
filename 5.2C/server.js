const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/gamedevDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

const submissionRoutes = require("./routes/submissionRoutes");
app.use("/", submissionRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

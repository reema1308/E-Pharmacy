const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Backend is running successfully ");
  });

  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected to database:", mongoose.connection.name);
  })
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));
app.use("/api/order", require("./routes/order"));

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

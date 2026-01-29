const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "user"   // 🔴 ye bahut important hai
  }
});

module.exports = mongoose.model("User", UserSchema);

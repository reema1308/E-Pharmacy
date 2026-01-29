const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,   // ✅ comma added
  stock: Number,
  category: String,   // 👈 NEW (tablet, syrup, baby, device
  image: String          // 👈 image URL
});

module.exports = mongoose.model("Product", ProductSchema);

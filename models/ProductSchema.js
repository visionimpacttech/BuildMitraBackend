const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }], // Array to store image URLs
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);

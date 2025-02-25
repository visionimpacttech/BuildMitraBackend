const express = require("express");
const Product = require("../models/ProductSchema");

const router = express.Router();

// ✅ Test Route (Keep this)
router.get("/", (req, res) => {
  res.send("Product route is working!");
});

// ✅ Product Upload API (Sellers Can List Products)
router.post("/add", async (req, res) => {
  try {
    const { sellerId, name, description, price, category, stock, images } = req.body;

    if (!sellerId || !name || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({ sellerId, name, description, price, category, stock, images });
    await product.save();

    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

module.exports = router;

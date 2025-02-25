const express = require("express");
const jwt = require("jsonwebtoken");
const admin = require("../config/firebaseConfig");
require("dotenv").config();

const router = express.Router();

// ✅ Existing Login API
router.post("/login", async (req, res) => {
  const { phone, role } = req.body;

  if (!phone || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const token = jwt.sign({ phone, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, role });
});

// ✅ Seller Login API (Firebase OTP Authentication)
router.post("/seller-login", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    // Generate Firebase custom token
    const token = await admin.auth().createCustomToken(phone);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error generating token", error });
  }
});

module.exports = router;

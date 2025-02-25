const express = require("express");
const User = require("../models/UserSchema");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { phone, role, companyDetails, documents, bankDetails } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({
      phone,
      role,
      companyDetails,
      documents,
      bankDetails,
      verified: false,
    });

    await newUser.save();
    res.json({ message: "User Registered Successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;  // ✅ Ensure you export only `router`

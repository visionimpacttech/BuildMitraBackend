const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ["manufacturer", "vendor", "worker"], required: true },
  companyDetails: { type: Object, default: {} },
  documents: { gst: String, pan: String, aadhaar: String },
  bankDetails: { type: Object, default: {} },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);

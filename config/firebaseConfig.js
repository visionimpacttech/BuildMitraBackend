const admin = require("firebase-admin");
const path = require("path");

// ✅ Load the service account key correctly
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

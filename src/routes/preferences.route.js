const express = require("express");
const preferences = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferences.controller");

preferences.get("/", verifyToken, getPreferences);

preferences.put("/", verifyToken, updatePreferences);

module.exports = preferences;

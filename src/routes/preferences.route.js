const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferences.controller");

router.get("/", verifyToken, getPreferences);

router.put("/", verifyToken, updatePreferences);

module.exports = router;

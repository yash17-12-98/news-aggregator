const express = require("express");
const { login, signUp } = require("../controllers/auth.controller");
const auth = express.Router();

auth.post("/login", login);
auth.post("/signup", signUp);

module.exports = auth;

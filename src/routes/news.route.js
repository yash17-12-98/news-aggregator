const express = require("express");
const { getNews } = require("../controllers/news.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const news = express.Router();

news.get("", verifyToken, getNews);

module.exports = news;

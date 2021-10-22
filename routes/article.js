const express = require("express");
const route = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const { isAuth } = require("../middleware/isAuth");

route.get("/", articleCtrl.getHome);

route.get("/all-articles", articleCtrl.getAllArticles);
route.get("/create", isAuth, articleCtrl.getCreate);

route.post("/create", articleCtrl.postCreate);

module.exports = route;

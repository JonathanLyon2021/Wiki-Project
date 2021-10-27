const express = require("express");
const route = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const { isAuth } = require("../middleware/isAuth");

route.get("/", articleCtrl.getHome);

route.get("/all-articles", articleCtrl.getAllArticles);
route.get("/create", isAuth, articleCtrl.getCreate);

route.post("/create", articleCtrl.postCreate);

route.get("/article/:title", articleCtrl.getDetails);

route.get("/delete/:id", articleCtrl.deleteArticle);

route.get("/edit/:id", articleCtrl.getEdit);

route.post("/edit/:id", articleCtrl.postEdit);





module.exports = route;

const express = require("express");
const route = express.Router();
const articleCtrl = require("../controllers/articleCtrl");

route.get("/", articleCtrl.getHome);

module.exports = route;

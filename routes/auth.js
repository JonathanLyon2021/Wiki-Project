const express = require("express");
const route = express.Router();
const authCtrl = require("../controllers/authCtrl");

route.get("/register", authCtrl.getRegister);
route.post("/register", authCtrl.postRegister);


module.exports = route;


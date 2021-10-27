const express = require("express");
const route = express.Router();
const authCtrl = require("../controllers/authCtrl");

route.get("/register", authCtrl.getRegister);
route.post("/register", authCtrl.postRegister);

route.get("/login", authCtrl.getLogin);
route.post("/login", authCtrl.postLogin);
route.get("/logout", authCtrl.getLogout);



module.exports = route;


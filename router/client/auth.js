const express = require("express");
const path = require("path");
const router = express.Router();

const authRouter  = require("../../controllers/client/auth.controller.js")
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..","..", "views","client" ,"auth", "login.html"));
});


router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..","..", "views", "client","auth", "register.html"));
});
router.post("/login", authRouter.login);
router.post("/register", authRouter.register); 

module.exports = router;
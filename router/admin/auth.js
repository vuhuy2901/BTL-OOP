const express = require("express");
const path = require("path");
const router = express.Router();
const { handleLogin } = require("../../controllers/admin/auth.controller.js");


router.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..","..", "views","admin" ,"auth", "login.html"));
});

router.post("/admin/login", handleLogin);


module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/dashBoard.controller.js");

router.get("/", controller);

module.exports = router;

var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const brandModel = require("../models/brandModel");
const productModel = require("../models/productModel");

/* GET home page. */
router.get("/", function (req, res, next) {
   res.render("index", { title: "Express" });
});

module.exports = router;

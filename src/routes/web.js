const express = require("express");
const {
  getHomepage,
  getAbc,
  getHau,
} = require("../controllers/homeController");
const router = express.Router();

// khai bao route
router.get("/", getHomepage);
router.get("/abc", getAbc);
router.get("/hau", getHau);

module.exports = router; // eport defalt

const connection = require("../config/database");

const getHomepage = (req, res) => {
  // process database
  res.send("Hello World! VS ngo dang hau");
};

const getAbc = (req, res) => {
  res.send("check ABC");
};

const getHau = (req, res) => {
  res.render("sample.ejs");
};

module.exports = {
  getHomepage,
  getAbc,
  getHau,
};

import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./routes/web";
import initAPIRoute from "./routes/api";

require("dotenv").config();
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(">>>> run into my middlware");
  next();
});

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // lưu được dữ liệu

/// setup view Engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

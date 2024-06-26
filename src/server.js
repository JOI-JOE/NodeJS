require("dotenv").config();
const express = require("express"); // commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
// nếu không chạy được 8081 thì env được ra rồi

const app = express();
const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 8088;

// config template engine
configViewEngine(app);

// khai bao route
app.use("/", webRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});

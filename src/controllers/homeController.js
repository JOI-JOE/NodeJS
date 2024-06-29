import pool from "../configs/connectDB";
let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `Users` u ");

  return res.render("home.ejs", { dataUser: rows, hau: "hau dep trai" });
};
let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM `Users` u WHERE u.id = ?", [
    userId,
  ]);

  console.log("check req params: ", user);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log("check req body: ", req.body);
  let { name, email, city } = req.body;
  await pool.execute("INSERT INTO Users(email,name,city) VALUES  (?, ?, ?)", [
    email,
    name,
    city,
  ]);
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
};

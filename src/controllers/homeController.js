import pool from "../configs/connectDB";
import multer from "multer";

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

let deleteUser = async (req, res) => {
  let userId = req.body.usesId;
  await pool.execute("DELETE FROM Users WHERE id = ?", [userId]);
  // return res.send(`Hello from delete user ${req.body.usesId}`);
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let userId = req.params.id;
  // vì user là array
  let [user] = await pool.execute("SELECT * FROM `Users` u WHERE u.id = ?", [
    userId,
  ]);

  return res.render("update.ejs", { dataUser: user[0] }); // x < - y
};

let postUpdateUser = async (req, res) => {
  let { name, email, city, id } = req.body;
  await pool.execute(
    "UPDATE `Users` SET `name` = ?, `email` = ?, `city` = ? WHERE id = ?",
    [name, email, city, id]
  );
  return res.redirect("/");
};

let getUploadFile = async (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("profile_pic");
// const uploadMultiple = multer().array("multiple_images");

let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

let handleUploadMultipleFiles = async (req, res) => {
  uploadMultiple(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log(">>> files: ", files);
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result += `<img src="/images/${files[index].filename}" ="width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
  });
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFile,
  handleUploadFile,
  handleUploadMultipleFiles,
};

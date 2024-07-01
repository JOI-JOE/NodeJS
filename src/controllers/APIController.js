import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  // http
  // 404 page not found
  // 501 not implemented (sập)
  // chuận format : json/xml (xml ít khi dùng) => biến dữ lieuj thành một object
  // api lấy dữ liệu đổ ra giao diện
  const [rows, fields] = await pool.execute("SELECT * FROM `Users` u ");

  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { name, email, city } = req.body;

  if (!name || !email || !city) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute("INSERT INTO Users(email,name,city) VALUES  (?, ?, ?)", [
    email,
    name,
    city,
  ]);

  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let { name, email, city, id } = req.body;

  if (!name || !email || !city || !id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute(
    "UPDATE `Users` SET `name` = ?, `email` = ?, `city` = ? WHERE id = ?",
    [name, email, city, id]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.id;

  if (!userId) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute("DELETE FROM Users WHERE id = ?", [userId]);

  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};

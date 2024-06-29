import mysql from "mysql2/promise";

console.log("Creating connection ...");

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "hoidanit",
});

export default pool;

require("dotenv").config();

const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_database",
  password: "admin123@123",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error in DB connection :" + JSON.stringify(err, undefined, 2));
  } else {
    console.log("DB connected successfully");
  }
});

module.exports = mysqlConnection;

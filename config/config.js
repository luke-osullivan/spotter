//import dotenv dependencies
require("dotenv").config();

module.exports={
    "development": {
      "username": "root",
      "password": process.env.SQL_PASS,
      "database": "sequelize_json",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "use_env_variable": process.env.JAWSDB_URL,
      "dialect": "mysql"
    }
  }

const mysql = require("mysql");

let db;

if (process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: SQLpass,
    database: "sequelize_json"
  });
}

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("connected to the db");
});

module.exports = db;
  
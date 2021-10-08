var mysql = require("mysql");

var con = mysql.createConnection({
  host: "cmpe273.cue0nkfbl9xm.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "archita22",
  database: "UberEats",
});

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "pikutuku",
//   database: "mydb",
// });

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;

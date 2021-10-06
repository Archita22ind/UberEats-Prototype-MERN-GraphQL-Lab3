const con = require("../../Controller/Common/dbConnection");

//API to get the user email and login details to ensure correct login passwrd pair

const restaurantLoginInfo = (req, res) => {
  console.log(req.body);
  let sqlSelect = `SELECT PasswordValue, RestaurantID  from RestaurantDetails where EmailID = ?`;

  con.query(sqlSelect, [req.body.emailId], (err, result) => {
    if (err) throw err;

    if (result[0]?.PasswordValue == req.body.password) {
      res.send({
        successFlag: true,
        restaurantId: result[0].RestaurantID,
      });
    } else {
      res.sendStatus(401); //fatega on error
    }
  });
};

module.exports = restaurantLoginInfo;

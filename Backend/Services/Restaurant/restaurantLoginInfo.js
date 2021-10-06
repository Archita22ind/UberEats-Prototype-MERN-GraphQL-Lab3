const con = require("../../Controller/Common/dbConnection");

//API to get the user email and login details to ensure correct login passwrd pair

const restaurantLoginInfo = (req, res) => {
  let sqlSelect = `SELECT PasswordValue, RestaurantID  from RestaurantDetails where EmailID = ?`;
  try {
    con.query(sqlSelect, [req.body.emailId], (err, result) => {
      if (err) throw err;

      if (result[0]?.PasswordValue == req.body.password) {
        res.send({
          successFlag: true,
          restaurantId: result[0].RestaurantID,
        });
      } else {
        return res
          .status(401)
          .json({ error: "Incorrect Email ID or Password Login!" });
      }
    });
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = restaurantLoginInfo;

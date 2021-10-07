const con = require("../../Controller/Common/dbConnection");
const app = require("../../app");

//API to get the details of the restaurant owner from the sign up page, only mandatory fields updated
const restaurantSignUpInfo = (req, res) => {
  let checkSql = `SELECT * FROM RestaurantDetails where EmailID = ?`;

  con.query(checkSql, [req.body.emailId], (err, result1) => {
    if (err) throw err;
    if (result1.length > 0) {
      res.sendStatus(409);
    } else {
      let sql =
        "INSERT INTO  RestaurantDetails (RestaurantName,Passwordvalue,Address,City,State,ZipCode,Country,ContactNumber,EmailID) VALUES (?,?,?,?,?,?,?,?,?)";

      con.query(
        sql,
        [
          req.body.restaurantName,
          req.body.password,
          req.body.address,
          req.body.city,
          req.body.state,
          req.body.zipCode,
          req.body.country,
          req.body.contactNumber,
          req.body.emailId,
        ],
        (err, result) => {
          if (err) throw err;

          return res.status(200).send({
            restaurantId: result.insertId,
          });
        }
      );
    }
  });
};

//**********End of restaurant profile creation********/

module.exports = restaurantSignUpInfo;

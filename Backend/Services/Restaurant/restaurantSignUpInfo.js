const con = require("../../Controller/Common/dbConnection");
const app = require("../../app");

//API to get the details of the restaurant owner from the sign up page, only mandatory fields updated
const restaurantSignUpInfo = (req, res) => {
  console.log(req.body);
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
      console.log(result);
      console.log("1 record for restaurant details inserted");
      return res.status(200).send({
        restaurantId: result.insertId,
      });
    }
  );
};

//**********End of restaurant profile creation********/

module.exports = restaurantSignUpInfo;

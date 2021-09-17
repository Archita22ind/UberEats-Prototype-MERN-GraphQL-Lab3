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

//API to Update restaurant profile details
// app.post("/updateRestaurantProfileInfo", function (req, res) {
//   upload(req, res, function (err) {
//     let sql = `UPDATE RestaurantDetails SET RestaurantDescription=?,OpenCLoseFlag=?,Timings=?,
//       VegetarianFlag=?, NonVegetarianFlag=?, VeganFlag=?,DeliveryFlag=?,PickupFlag=?,
//       ProfilePicture=?) WHERE RestaurantID =? `;

//     let data = [
//       req.body.restautantDescription,
//       req.body.openCloseFlag,
//       req.body.timings,
//       req.body.vegetarianFlag,
//       req.body.nonVegetarianFlag,
//       req.body.veganFlag,
//       req.body.deliveryFlag,
//       req.body.pickupFlag,
//       req.file.filename,
//       req.body.restaurantId,
//     ];

//     con.connect(function (err) {
//       if (err) throw err;
//       console.log("Connected!");
//       con.query(sql, data, (err, result) => {
//         if (err) throw err;
//         console.log("1 restaurant record updated with profile details");
//       });
//     });

//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });
/******* end of restaurant profile update API******/

module.exports = restaurantSignUpInfo;

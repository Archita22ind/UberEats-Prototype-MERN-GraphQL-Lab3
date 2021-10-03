const con = require("../../Controller/Common/dbConnection");
const app = require("../../app");
const multer = require("multer");

const restaurantDetailsInfo = (req, res, err) => {
  // console.log("aya kya h", req.query);
  let id = req.query.restaurantId;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  let sqlSelect = `SELECT  RestaurantName, Address, About, City, State, ZipCode, Country, ContactNumber, EmailID, ProfilePicture FROM  RestaurantDetails where RestaurantID = ?`;

  con.query(sqlSelect, [id], (err, result) => {
    // console.log(result);

    if (err) throw err;
    if (result) {
      res.send({
        restaurantName: result[0].RestaurantName,
        address: result[0].Address,
        about: result[0].About,
        city: result[0].City,
        state: result[0].State,
        zipCode: result[0].ZipCode,
        country: result[0].Country,
        contactNumber: result[0].ContactNumber,
        emailId: result[0].EmailID,
        image: result[0].ProfilePicture,
      });
    }
  });
};

module.exports = restaurantDetailsInfo;

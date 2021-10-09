const con = require("../../Controller/Common/dbConnection");
const app = require("../../app");
const multer = require("multer");

const restaurantDetailsInfo = (req, res, err) => {
  let id = req.query.restaurantId;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  let sqlSelect = `SELECT  RestaurantID, RestaurantName, Address, About, City, State, ZipCode, Country, 
  ContactNumber, EmailID, ProfilePicture,OpenTime,CloseTime,DeliveryFlag,PickupFlag
   FROM  RestaurantDetails where RestaurantID = ?`;

  con.query(sqlSelect, [id], (err, result) => {
    if (err) throw err;
    if (result) {
      console.log("yahan", result);
      res.send({
        restaurantId: result[0].RestaurantID,
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
        openTime: result[0].OpenTime,
        closeTime: result[0].CloseTime,
        deliveryFlag: result[0].DeliveryFlag,
        pickupFlag: result[0].PickupFlag,
      });
    }
  });
};

module.exports = restaurantDetailsInfo;

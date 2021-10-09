const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const restaurantDetailsInfoUpdate = (req, res, err) => {
  let restaurantId = req.body.restaurantId;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  con.query(
    `SELECT * FROM RestaurantDetails WHERE RestaurantID = ?`,
    [restaurantId],
    (err, result) => {
      if (err) throw err;

      if (result.length == 1) {
        let currentValues = result[0];
        let updateImage;

        let updateSql = `UPDATE RestaurantDetails SET  RestaurantName = ?, Address= ?, City=?,State=? , 
  ZipCode =?, Country=?, About=? , ContactNumber=? , EmailID=? , OpenTime=?, CloseTime= ? ,
  DeliveryFlag =? , PickupFlag=?, ProfilePicture=? WHERE   RestaurantID = ?`;

        if (req.file?.filename) updateImage = req.file.filename;
        else updateImage = currentValues.ProfilePicture;

        let data = [
          req.body.restaurantName || currentValues.RestaurantName,
          req.body.address || currentValues.Address,
          req.body.city || currentValues.City,
          req.body.state || currentValues.State,
          req.body.zipCode || currentValues.ZipCode,
          req.body.country || currentValues.Country,
          req.body.about || currentValues.About,
          req.body.contactNumber || currentValues.ContactNumber,
          req.body.emailId || currentValues.EmailID,
          req.body.openTime || currentValues.OpenTime,
          req.body.closeTime || currentValues.CloseTime,
          req.body.deliveryFlag || currentValues.DeliveryFlag,
          req.body.pickupFlag || currentValues.PickupFlag,
          updateImage,
          restaurantId,
        ];

        con.query(updateSql, data, (err, result1) => {
          if (err) throw err;

          // console.log("Result print", result1);
          return res.status(200).send({
            responseFlag: "Success",
          });
        });
      }
    }
  );
};

module.exports = restaurantDetailsInfoUpdate;

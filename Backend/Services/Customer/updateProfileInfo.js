const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const updateProfileInfo = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  con.query(
    `SELECT * FROM CustomerDetails WHERE CustomerID = ?`,
    [req.body.customerId],
    (err, result) => {
      if (err) throw err;

      if (result.length == 1) {
        let currentValues = result[0];
        let updateSql;
        let updateImage;

        updateSql = `UPDATE CustomerDetails SET  LastName = ?, FirstName= ?,PasswordValue=?, AddressLine1=?,AddressLine2=?,City=? ,State =?, Country=?,ZipCode=?, NickName=? , ContactNumber=? ,EmailID=? ,DateOfBirth=?, About=? , ProfilePicture=? WHERE  CustomerID = ?`;

        if (req.file?.filename) updateImage = req.file.filename;
        else updateImage = currentValues.FoodImage;

        let data = [
          req.body.lastName || currentValues.LastName,
          req.body.firstName || currentValues.FirstName,
          req.body.password || currentValues.PasswordValue,
          req.body.address1 || currentValues.AddressLine1,
          req.body.address2 || currentValues.AddressLine2,
          req.body.city || currentValues.City,
          req.body.state || currentValues.State,
          req.body.country || currentValues.Country,
          req.body.zipCode || currentValues.ZipCode,
          req.body.nickname || currentValues.NickName,
          req.body.contactNumber || currentValues.ContactNumber,
          req.body.emailId || currentValues.EmailID,
          req.body.dateOfBirth || currentValues.DateOfBirth,
          req.body.about || currentValues.About,
          updateImage,
          req.body.customerId || currentValues.CustomerID,
        ];

        con.query(updateSql, data, (err, result) => {
          if (err) throw err;
          if (result) {
            res.status(200).send({
              responseFlag: "Success",
            });
          }
        });
      }
    }
  );
};

module.exports = updateProfileInfo;

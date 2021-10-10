const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const updateProfileInfo = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  try {
    con.query(
      `SELECT * FROM CustomerDetails WHERE CustomerID = ?`,
      [req.body.customerId],
      (err, result) => {
        // if (err) throw err;

        if (result.length == 1) {
          let currentValues = result[0];
          let updateSql;
          let updateImage;

          updateSql = `UPDATE CustomerDetails SET  LastName = ?, FirstName= ?,PasswordValue=?, AddressLine1=?,AddressLine2=?,City=? ,State =?, Country=?,ZipCode=?, NickName=? , ContactNumber=? ,EmailID=? ,DateOfBirth=?, About=? , ProfilePicture=? WHERE  CustomerID = ?`;

          if (req.file?.filename) updateImage = req.file.filename;
          else updateImage = currentValues.FoodImage;

          let data = [
            req.body.lastName,
            req.body.firstName,
            req.body.password || currentValues.PasswordValue,
            req.body.address1,
            req.body.address2,
            req.body.city,
            req.body.state,
            req.body.country,
            req.body.zipCode,
            req.body.nickname,
            req.body.contactNumber,
            req.body.emailId,
            req.body.dateOfBirth,
            req.body.about,
            updateImage,
            req.body.customerId,
          ];

          console.log(data);

          con.query(updateSql, data, (err, result) => {
            // if (err) throw err;

            if (result) {
              res.status(200).send({
                responseFlag: "Success",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateProfileInfo;

const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const updateProfileInfo = (req, res, err) => {
  let cutomerid = 1;
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  con.query(
    `SELECT * FROM CustomerDetails WHERE CustomerID = ?`,
    [req.body?.customerId || cutomerid],
    (err, result) => {
      if (err) throw err;

      if (result.length == 1) {
        let currentValues = result[0];

        let updateImage;

        let updateSql = `UPDATE CustomerDetails SET  LastName = ?, FirstName= ?,PasswordValue=?, Address=?,City=? ,State =?, Country=?, NickName=? , ContactNumber=? ,EmailID=? ,DateOfBirth=?, About=? , ProfilePicture=? WHERE  CustomerID = ?`;

        if (req.file?.filename) updateImage = req.file.filename;
        else updateImage = currentValues.FoodImage;

        let data = [
          req.body.lastName || currentValues.LastName,
          req.body.firstName || currentValues.FirstName,
          req.body.password || currentValues.PasswordValue,
          req.body.address || currentValues.Address,
          req.body.city || currentValues.City,
          req.body.state || currentValues.State,
          req.body.country || currentValues.Country,
          req.body.nickname || currentValues.NickName,
          req.body.contactNumber || currentValues.ContactNumber,
          req.body.emailId || currentValues.EmailID,
          req.body.dateOfBirth || currentValues.DateOfBirth,
          req.body.about || currentValues.About,
          updateImage,
          req.body.customerId || cutomerid,
        ];

        con.query(updateSql, data, (err, result) => {
          if (err) throw err;
          console.log("1 customer  record updated");
        });

        return res.status(200).send({
          responseFlag: "Success",
        });
      }
    }
  );
};

/////////////////////////
// let updateSQL =
//   "INSERT INTO CustomerDetails1 (EmailID, ProfilePicture) VALUES (?,?)";

// con.query(sql, [req.body.email, req.file.filename], (err, result) => {
//   if (err) throw err;
//   console.log("1 record inserted for new customer");
// });

// return res.status(200).send(req.file.filename);

module.exports = updateProfileInfo;

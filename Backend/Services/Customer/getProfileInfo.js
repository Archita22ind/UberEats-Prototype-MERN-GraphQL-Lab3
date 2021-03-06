const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const getProfileInfo = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  let sqlSelect = `SELECT  * FROM CustomerDetails where CustomerID = ?`;

  con.query(
    sqlSelect,
    [req.body?.customerId || req.query.customerId],
    (err, result) => {
      // if (err) throw err;

      if (result) {
        res.status(200).send({
          lastName: result[0].LastName,
          firstName: result[0].FirstName,
          password: result[0].PasswordValue,
          address1: result[0].AddressLine1,
          address2: result[0].AddressLine2,
          city: result[0].City,
          state: result[0].State,
          country: result[0].Country,
          zipCode: result[0].ZipCode,
          nickname: result[0].NickName,
          contactNumber: result[0].ContactNumber,
          emailId: result[0].EmailID,
          dateOfBirth: result[0].DateOfBirth,
          about: result[0].About,
          image: result[0].ProfilePicture,
        });
      }
    }
  );
};
module.exports = getProfileInfo;

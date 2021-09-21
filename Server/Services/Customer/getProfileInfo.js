const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const getProfileInfo = (req, res, err) => {
  let cutomerid = 1;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  let sqlSelect = `SELECT  * FROM CustomerDetails where CustomerID = ?`;

  con.query(sqlSelect, [req.body?.customerId || cutomerid], (err, result) => {
    if (err) throw err;

    if (result) {
      res.send({
        lastName: result[0].LastName,
        firstName: result[0].FirstName,
        password: result[0].PasswordValue,
        address: result[0].Address,
        city: result[0].City,
        state: result[0].State,
        country: result[0].Country,
        nickname: result[0].NickName,
        contactNumber: result[0].ContactNumber,
        emailId: result[0].EmailID,
        dateOfBirth: result[0].DateOfBirth,
        about: result[0].About,
        image: result[0].ProfilePicture,
        customerId: cutomerid,
      });
    }
  });
};
module.exports = getProfileInfo;

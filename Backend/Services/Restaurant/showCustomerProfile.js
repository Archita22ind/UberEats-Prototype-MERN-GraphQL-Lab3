const con = require("../../Controller/Common/dbConnection");

const showCustomerProfile = (req, res) => {
  let sqlSelect = `SELECT  FirstName, LastName, AddressLine1, AddressLine2, City, ZipCode, ContactNumber,EmailID  FROM CustomerDetails where CustomerID = ?`;

  con.query(sqlSelect, [req.body.customerId], (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send({
        firstName: result[0].FirstName,
        lastName: result[0].LastName,
        addressLine1: result[0].AddressLine1 || "",
        addressLine2: result[0].AddressLine2 || "",
        city: result[0].City || "",
        zipcode: result[0].ZipCode || "",
        contactNumber: result[0].ContactNumber,
        emailId: result[0].EmailID,
      });
    }
  });
};

module.exports = showCustomerProfile;

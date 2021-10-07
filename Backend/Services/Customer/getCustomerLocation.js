const con = require("../../Controller/Common/dbConnection");

const getCustomerLocation = (req, res) => {
  //   let sqlSelect = `SELECT  City  FROM CustomerDetails where CustomerID = ?`;
  let sqlSelect = `SELECT City from CustomerDetails where CustomerID=?`;

  con.query(sqlSelect, [req.body.customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        city: result.length > 0 ? result[0].City : "",
      });
    }
  });
};

module.exports = getCustomerLocation;

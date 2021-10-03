const con = require("../../Controller/Common/dbConnection");

const customerSignIn = (req, res) => {
  let sqlSelect = `SELECT PasswordValue, CustomerID  from CustomerDetails where EmailID = ?`;

  con.query(sqlSelect, [req.body.emailId], (err, result) => {
    if (err) throw err;

    if (result[0].PasswordValue == req.body.password) {
      res.send({
        successFlag: true,
        customerID: result[0].CustomerID,
      });
    } else {
      res.sendStatus(401);
    }
  });
};

module.exports = customerSignIn;

const con = require("../../Controller/Common/dbConnection");

const customerSignIn = (req, res) => {
  let sqlSelect = `SELECT PasswordValue, CustomerID  from CustomerDetails where EmailID = ?`;

  try {
    con.query(sqlSelect, [req.body.emailId], (err, result) => {
      if (err) throw err;

      if (result[0]?.PasswordValue === req.body.password) {
        console.log("Logged in");
        res.send({
          successFlag: true,
          customerID: result[0].CustomerID,
        });
      } else {
        return res
          .status(401)
          .json({ error: "Incorrect Email ID or Password Login!" });
      }
    });
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = customerSignIn;

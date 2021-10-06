const con = require("../../Controller/Common/dbConnection");

const customerSignIn = (req, res) => {
  let sqlSelect = `SELECT PasswordValue, CustomerID  from CustomerDetails where EmailID = ?`;

  try {
    con.query(sqlSelect, [req.body.emailId], (err, result) => {
      if (err) throw err;

      try {
        if (result[0].PasswordValue === req.body.password) {
          res.send({
            successFlag: true,
            customerID: result[0].CustomerID,
          });
        } else {
          res.sendStatus(401);
        }
      } catch (exception) {
        console.log("I m here", exception);
        // console.log(exception);
        // res.sendStatus(500);
        res.status(500).send({ Message: exception });
      }
    });
  } catch (exception) {
    console.log("I m here");
    console.log(exception);
    res.sendStatus(500);
  }
};

module.exports = customerSignIn;

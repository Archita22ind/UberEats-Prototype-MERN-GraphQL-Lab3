const con = require("../../Controller/Common/dbConnection");

//API to get the details of the customer from the sign up page, only mandatory fields updated
const customerSignUpInfo = (req, res) => {
  let checkSql = `SELECT * FROM CustomerDetails where EmailID = ?`;

  con.query(checkSql, [req.body.emailId], (err, result1) => {
    if (err) throw err;
    if (result1.length > 0) {
      res.sendStatus(409);
    } else {
      let sql =
        "INSERT INTO CustomerDetails (LastName, FirstName, PasswordValue,City, State,ZipCode, Country,ContactNumber,EmailID) VALUES (?,?,?,?,?,?,?,?,?)";

      con.query(
        sql,
        [
          req.body.lastName,
          req.body.firstName,
          req.body.password,
          req.body.city || "",
          req.body.state || "",
          req.body.zipcode,
          req.body.country,
          req.body.contactNumber,
          req.body.emailId,
        ],
        (err, result) => {
          if (err) throw err;

          return res.status(200).send({
            customerId: result.insertId,
          });
        }
      );
    }
  });
};

module.exports = customerSignUpInfo;

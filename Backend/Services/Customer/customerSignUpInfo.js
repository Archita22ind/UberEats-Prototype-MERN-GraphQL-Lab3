const con = require("../../Controller/Common/dbConnection");

//API to get the details of the customer from the sign up page, only mandatory fields updated
const customerSignUpInfo = (req, res) => {
  console.log(req.body);
  let sql =
    "INSERT INTO CustomerDetails (LastName, FirstName, PasswordValue,City, State,Country,ContactNumber,EmailID) VALUES (?,?,?,?,?,?,?,?)";

  con.query(
    sql,
    [
      req.body.lastName,
      req.body.firstName,
      req.body.password,
      req.body.city,
      req.body.state,
      req.body.country,
      req.body.contactNumber,
      req.body.emailId,
    ],
    (err, result) => {
      if (err) throw err;
      console.log("1 record inserted for new customer");
      return res.status(200).send({
        customerId: result.insertId,
      });
    }
  );
};

module.exports = customerSignUpInfo;

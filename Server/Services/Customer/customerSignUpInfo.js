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

//**********End of customer profile creation********/

//API to Update Customer profile details
// app.post("/updateCustomerProfileInfo", function (req, res) {
//   upload(req, res, function (err) {
//     let sql = `UPDATE CustomerDetails SET Address =? ,NickName=?,DateOfBirth=?,About=?,ProfilePicture=?) WHERE CustomerID =? `;

//     let data = [
//       req.body.address,
//       req.body.nickName,
//       req.body.dateOfBirth,
//       req.body.about,
//       req.file.filename,
//       req.body.customerId,
//     ];

//     con.connect(function (err) {
//       if (err) throw err;
//       console.log("Connected!");
//       con.query(sql, data, (err, result) => {
//         if (err) throw err;
//         console.log("1 customer record updated with profile details");
//       });
//     });

//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });
/******* end of customer profile update API******/

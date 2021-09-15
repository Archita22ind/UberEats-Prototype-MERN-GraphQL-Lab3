//API to get the details of the customer from the sign up page, only mandatory fields updated
app.post("/customerSignUpInfo", function (req, res) {
  let sql =
    "INSERT INTO CustomerDetails (LastName, FirstName, PasswordValue,City, State,Country,ContactNumber,EmailID) VALUES (?,?,?,?,?,?,?,?)";

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
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
      }
    );
  });
});
//**********End of customer profile creation********/

//API to Update Customer profile details
app.post("/updateCustomerProfileInfo", function (req, res) {
  upload(req, res, function (err) {
    let sql = `UPDATE CustomerDetails SET Address =? ,NickName=?,DateOfBirth=?,About=?,ProfilePicture=?) WHERE CustomerID =? `;

    let data = [
      req.body.address,
      req.body.nickName,
      req.body.dateOfBirth,
      req.body.about,
      req.file.filename,
      req.body.customerId,
    ];

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log("1 customer record updated with profile details");
      });
    });

    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});
/******* end of customer profile update API******/

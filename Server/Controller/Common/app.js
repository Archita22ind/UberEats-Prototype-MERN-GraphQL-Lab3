const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const con = require("./dbConnection");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "/images")));



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });



//testing of images part
app.post("/updateProfileInfo", upload.single("file"), function (req, res, err) {
  console.log(req.file);
  console.log("Archi", req.body);

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  let sql =
    "INSERT INTO CustomerDetails1 (EmailID, ProfilePicture) VALUES (?,?)";

  con.query(sql, [req.body.email, req.file.filename], (err, result) => {
    if (err) throw err;
    console.log("1 record inserted for new customer");
  });

  return res.status(200).send(req.file.filename);
});



app.get("/apiImage", (req, res) => {
  const id = 8;

  let sqlSelect = "SELECT  * FROM  CustomerDetails1 where CustomerID = ?";

  con.query(sqlSelect, [id], (err, result) => {
    console.log(result);

    if (err) throw err;
    if (result) {
      res.send({
        image: result[0].ProfilePicture,
        email: result[0].EmailID,
      });

      console.log(
        "Records sent are ",
        result[0].ProfilePicture,
        result[0].EmailID
      );
    }
  });
});

//end of testing of images part

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
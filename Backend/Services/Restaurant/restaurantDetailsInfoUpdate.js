const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const restaurantDetailsInfoUpdate = (req, res, err) => {
  let id = 1;
  console.log("Print file name ", req.file);
  console.log("pta kro", req.body);
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  let updateSql = `UPDATE RestaurantDetails SET About = ?, ProfilePicture=?  WHERE  RestaurantID = ?`;

  con.query(
    updateSql,
    [req.body.about, req.file.filename, id],
    (err, result) => {
      if (err) throw err;
      console.log("1 record updated for the rest");
    }
  );

  return res.status(200).send("Received the update");
};

module.exports = restaurantDetailsInfoUpdate;

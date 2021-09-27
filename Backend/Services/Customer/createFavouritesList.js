const con = require("../../Controller/Common/dbConnection");

const createFavouritesList = (req, res) => {
  //   let sqlInsert = `INSERT INTO CustomerFavorites (CustomerID, RestaurantID) VALUES (?,?)`;

  console.log("fav id", req.body);

  //   con.query(sqlInsert, [], (err, result) => {
  //     if (err) throw err;
  //     if (result) {
  //       res.send(result);
  //     }
  //   });
};

module.exports = createFavouritesList;

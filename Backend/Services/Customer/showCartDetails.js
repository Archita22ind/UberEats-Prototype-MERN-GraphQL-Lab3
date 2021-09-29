const con = require("../../Controller/Common/dbConnection");

const showCartDetails = (req, res) => {
  let sqlSelect = `SELECT O.*, R.RestaurantName FROM OrderDetails  O , RestaurantDetails  R  
  WHERE  O.RestaurantID = R.RestaurantID AND O.Status = "${"Current"}" AND  O.CustomerID= (?) `;

  con.query(sqlSelect, [req.body.customerId], (err, result) => {
    if (err) throw err;

    if (result) {
      res.send(result);
    }
  });
};

module.exports = showCartDetails;

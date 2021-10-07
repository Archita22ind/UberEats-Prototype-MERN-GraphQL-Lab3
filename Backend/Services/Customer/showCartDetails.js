const con = require("../../Controller/Common/dbConnection");

const showCartDetails = (req, res) => {
  let sqlSelOrderID = `SELECT OrderID from Orders where CustomerID= (?) and FinalStatus =(?)`;

  con.query(sqlSelOrderID, [req.body.customerId, "New"], (err, result) => {
    if (err) throw err;
    if (result) {
      let sqlSelect = `SELECT O.*, R.RestaurantName FROM OrderDetails  O , RestaurantDetails  R
        WHERE  O.RestaurantID = R.RestaurantID AND O.OrderId= (?) AND  O.CustomerID= (?) `;
      con.query(
        sqlSelect,
        [result[0].OrderID, req.body.customerId],
        (err, result) => {
          if (err) throw err;
          if (result) {
            res.send(result);
          }
        }
      );
    }
  });
};

module.exports = showCartDetails;

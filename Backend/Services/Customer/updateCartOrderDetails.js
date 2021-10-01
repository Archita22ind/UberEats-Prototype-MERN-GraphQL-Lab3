const con = require("../../Controller/Common/dbConnection");

const updateCartOrderDetails = (req, res) => {
  console.log("update", req.body);

  if (req.body.Quantity === 0) {
    let sqlDelete = `DELETE FROM OrderDetails WHERE OrderLineId = ?`;
    con.query(sqlDelete, [req.body.OrderLineId], (err, result) => {
      if (err) throw err;
    });
  } else {
    let sqlUpdate = `UPDATE OrderDetails SET  Quantity = ? , Amount=?  WHERE  OrderLineId = ? `;

    con.query(
      sqlUpdate,
      [
        req.body.Quantity,
        req.body.Quantity * req.body.Price,
        req.body.OrderLineId,
      ],
      (err, result) => {
        if (err) throw err;
      }
    );
  }

  let sqlSelect = `SELECT O.* , R.RestaurantName FROM  OrderDetails  O  , RestaurantDetails R WHERE  O.RestaurantID= R.RestaurantID AND O.CustomerID= ? `;

  con.query(sqlSelect, [req.body.CustomerID], (err, result) => {
    if (err) throw err;

    if (result) {
      res.send(result);
    }
  });
};

module.exports = updateCartOrderDetails;

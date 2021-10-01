const con = require("../../Controller/Common/dbConnection");

const placeFinalOrder = (req, res) => {
  console.log(req.body);
  // let sql =
  //   "INSERT INTO Orders (OrderLineId, FoodID,RestaurantID,CustomerID, TotalPrice, TotalItems, DateOrdered, Satus) VALUES (?,?,?,?,?,?,?,?)";

  // con.query(sql, [], (err, result) => {
  //   if (err) throw err;
  //   console.log("1 record inserted for new customer");
  //   return res.status(200).send({
  //     customerId: result.insertId,
  //   });
  // });

  return res.status(200).send({});
};

module.exports = placeFinalOrder;

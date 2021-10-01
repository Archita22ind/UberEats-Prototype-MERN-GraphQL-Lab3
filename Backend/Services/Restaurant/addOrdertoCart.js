const con = require("../../Controller/Common/dbConnection");

const addOrdertoCart = (req, res) => {
  if (!req.body.quantity) {
    res.send("No Dish added as quantity is 0");
    return;
  }

  // let sqlInsert1 =
  //   "INSERT INTO Orders ( RestaurantID, CustomerID, FinalStatus) VALUES (?,?,?)";

  // let array1 = [req.body.restaurantId, req.body.customerId, "New"];

  // con.query(sqlInsert1, array1, (err, result) => {
  //   if (err) throw err;
  //   console.log("mera result", result);
  //   if (result) {
  //     res.send("Added to cart");
  //   }
  //   // });

  let sqlInsert =
    "INSERT INTO OrderDetails (FoodID, RestaurantID, FoodName, Price ,Quantity, CustomerId, Amount, OrderStatus) VALUES (?,?,?,?,?,?,?,?)";

  let array = [
    req.body.foodId,
    req.body.restaurantId,
    req.body.foodName,
    req.body.dishPrice,
    req.body.quantity,
    req.body.customerId,
    req.body.dishPrice * req.body.quantity,
    "Current",
  ];
  con.query(sqlInsert, array, (err, result) => {
    if (err) throw err;

    if (result) {
      res.send("Added to cart");
    }
  });
};

module.exports = addOrdertoCart;

const con = require("../../Controller/Common/dbConnection");

const addOrdertoCart = (req, res) => {
  let mainOrderId;
  let array3 = [];

  if (!req.body.quantity) {
    res.send("No Dish added as quantity is 0");
    return;
  }
  let sqlInsert3 =
    "INSERT INTO OrderDetails (OrderId, FoodId, RestaurantID, CustomerId, FoodName, Price ,Quantity, Amount, OrderStatus) VALUES (?,?,?,?,?,?,?,?,?)";

  let sqlSelect = `SELECT OrderID from Orders where CustomerID = (?) AND FinalStatus= (?)`;

  con.query(sqlSelect, [req.body.customerId, "New"], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      //means already order exists
      mainOrderId = result[0].OrderID;
      array3 = [
        mainOrderId,
        req.body.foodId,
        req.body.restaurantId,
        req.body.customerId,
        req.body.foodName,
        req.body.dishPrice,
        req.body.quantity,
        req.body.dishPrice * req.body.quantity,
        "Current",
      ];

      con.query(sqlInsert3, array3, (err, result) => {
        if (err) throw err;

        if (result) {
          res.send("Added to cart");
        }
      });
    } else {
      let sqlInsert =
        "INSERT INTO Orders ( RestaurantID, CustomerID, FinalStatus ) VALUES (?,?,?)";

      con.query(
        sqlInsert,
        [req.body.restaurantId, req.body.customerId, "New"],
        (err, result0) => {
          if (err) throw err;
          if (result0) {
            console.log("insert query ka result", result0.insertId);
            mainOrderId = result0.insertId;
            array3 = [
              mainOrderId,
              req.body.foodId,
              req.body.restaurantId,
              req.body.customerId,
              req.body.foodName,
              req.body.dishPrice,
              req.body.quantity,
              req.body.dishPrice * req.body.quantity,
              "Current",
            ];

            con.query(sqlInsert3, array3, (err, result) => {
              if (err) throw err;

              if (result) {
                res.send("Added to cart");
              }
            });
          }
        }
      );
    }

    //   con.query(sqlInsert3, array3, (err, result) => {
    //     if (err) throw err;

    //     if (result) {
    //       res.send("Added to cart");
    //     }
    //   });
  });
};

module.exports = addOrdertoCart;

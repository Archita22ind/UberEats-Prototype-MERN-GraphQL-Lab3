const con = require("../../Controller/Common/dbConnection");

const getRestaurantOrders = (req, res) => {
  let sqlSelect;
  let columnArray;
  let orderStatus;
  if (req.body.orderStatus) {
    sqlSelect = `SELECT   OrderID,TotalPrice, TotalQuantity, DeliveryAddress, DateOrdered ,FinalStatus ,CustomerID FROM Orders where RestaurantID = (?) AND FinalStatus = (?) ORDER BY DateOrdered DESC`;
    if (req.body.orderStatus === "New") orderStatus = "Order Received";
    else orderStatus = req.body.orderStatus;

    columnArray = [req.body.restaurantId, orderStatus];
  } else {
    sqlSelect = `SELECT   OrderID,TotalPrice, TotalQuantity, DeliveryAddress, DateOrdered , FinalStatus, CustomerID FROM Orders where RestaurantID = (?) ORDER BY DateOrdered DESC`;
    columnArray = [req.body.restaurantId];
  }

  con.query(sqlSelect, columnArray, (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send(
        result.map((element) => {
          return {
            orderId: element.OrderID,
            totalPrice: element.TotalPrice,
            totalQuantity: element.TotalQuantity,
            deliveryAddress: element.DeliveryAddress,
            dateOrdered: element.DateOrdered,
            orderStatus: element.FinalStatus,
            customerId: element.CustomerID,
          };
        })
      );
    }
  });
};

module.exports = getRestaurantOrders;

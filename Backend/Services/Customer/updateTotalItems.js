const con = require("../../Controller/Common/dbConnection");

const updateTotalItems = (customerId) => {
  let totalQuantity = 0;
  let sql = `SELECT Quantity , OrderId from OrderDetails where CustomerId = (?) and OrderStatus=(?)`;

  con.query(sql, [customerId, "Ordered"], (err, result) => {
    if (err) throw err;
    if (result) {
      result.forEach((element) => {
        totalQuantity += element.Quantity;
      });

      let Updatesql = `UPDATE Orders SET  TotalQuantity = (?), FinalStatus=(?) where OrderId = (?)`;

      con.query(
        Updatesql,
        [totalQuantity, "Order Received", result[0].OrderId],
        (err, result1) => {
          if (err) throw err;
          if (result1) {
            let Updatesql1 = `UPDATE OrderDetails SET  OrderStatus=(?) where OrderId = (?)`;
            con.query(
              Updatesql1,
              ["Order Sent", result[0].OrderId],
              (err, result2) => {
                if (err) throw err;
                if (result2) {
                  console.log("total quantity updated");
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = updateTotalItems;

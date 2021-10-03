const con = require("../../Controller/Common/dbConnection");
const updateTotalItems = require("./updateTotalItems");

const bookOrder = (req, res) => {
  // let customerId = req.body.customerId;
  //   let date_ob = new Date();

  let ts = Date.now();
  let date_ob = new Date(ts);

  let Updatesql = `UPDATE Orders SET  TotalPrice = (?),  DateOrdered = (?), FinalStatus =(?) where CustomerID = (?) and FinalStatus = (?)`;
  //   console.log("date", date_ob);
  con.query(
    Updatesql,
    [req.body.totalPrice, date_ob, "Ordered", req.body.customerId, "New"],
    (err, result) => {
      if (err) throw err;
      if (result) {
        let Updatesql1 = `UPDATE OrderDetails SET  OrderStatus = (?) Where CustomerID = (?) and OrderStatus = (?)`;

        con.query(
          Updatesql1,
          ["Ordered", req.body.customerId, "Current"],
          (err, result) => {
            if (result) {
              console.log("book", result);
              updateTotalItems(req.body.customerId);
              res.status(200).send({ Message: "Order Booked!" });
            }
          }
        );
      }
    }
  );
};

module.exports = bookOrder;

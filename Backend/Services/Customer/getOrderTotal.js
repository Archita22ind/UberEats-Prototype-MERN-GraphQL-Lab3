const con = require("../../Controller/Common/dbConnection");

const getOrderTotal = (req, res) => {
  let customerId = req.query.customerId;
  let subTotal = 0;
  let totalItems = 0;

  let sqlSelect = `SELECT  * FROM OrderDetails where CustomerID = (?) AND OrderStatus = (?)`;

  con.query(sqlSelect, [customerId, "Current"], (err, result) => {
    if (err) throw err;
    if (result) {
      result.forEach((element) => (subTotal += element.Amount));
      result.forEach((element) => (totalItems += element.Quantity));
      // console.log("result", result);
      // console.log("total", subTotal);
      res.status(200).send({ subTotal: subTotal, totalItems: totalItems });
    }
  });
};

module.exports = getOrderTotal;

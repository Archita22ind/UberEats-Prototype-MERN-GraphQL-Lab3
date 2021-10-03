const con = require("../../Controller/Common/dbConnection");

const getOrderTotal = (req, res) => {
  let customerId = req.query.customerId;

  let sqlSelect = `SELECT  OrderId, TotalPrice  FROM Orders where CustomerID = (?) AND finalStatus = (?)`;

  con.query(sqlSelect, [customerId, "New"], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        OrderId: result[0].OrderId,
        TotalPrice: result[0].TotalPrice,
      });
    }
  });
};

module.exports = getOrderTotal;

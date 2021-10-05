const con = require("../../Controller/Common/dbConnection");

const updateOrderStatus = (req, res) => {
  let updateSql = `UPDATE Orders SET  FinalStatus = ? WHERE  OrderId = ?`;

  con.query(updateSql, [req.body.orderStatus], (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send({
        message: "Order status updated",
      });
    }
  });
};

module.exports = updateOrderStatus;

const con = require("../../Controller/Common/dbConnection");

const getTypeaheadList = (req, res) => {
  console.log(req.body);
  let listOfTypeahead;
  let selectSql1 = `SELECT * FROM RestaurantDetails where RestaurantName like '%${req.body.input}%'`;

  con.query(selectSql1, (err, result1) => {
    if (err) throw err;

    if (result1) {
      console.log(result1);

      result1.forEach((element) => {
        listOfTypeahead = [
          {
            [element.RestaurantName]: element.RestaurantID,
          },
        ];
      });
      console.log("final result", listOfTypeahead);

      res.send(listOfTypeahead);
    }

    // let selectSql2 = `SELECT FoodName FROM FoodItems where FoodName
    //  like '%${req.body.input}%' `;

    // con.query(selectSql, (err, result1) => {
    //   if (err) throw err;

    //   if (result1) {
    //     console.log(result1);

    //     //   res.send(result1);
    //   }
    // });
  });
};

module.exports = getTypeaheadList;

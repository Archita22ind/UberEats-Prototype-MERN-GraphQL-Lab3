const con = require("../../Controller/Common/dbConnection");

const getTypeaheadList = (req, res) => {
  let listOfTypeahead = [];
  let selectSql1 = `SELECT * FROM RestaurantDetails where RestaurantName like '%${req.body.input}%'`;

  con.query(selectSql1, (err, result1) => {
    if (err) throw err;

    if (result1) {
      result1.forEach((v) => {
        listOfTypeahead.push({
          name: v.RestaurantName,
          id: [v.RestaurantID],
          isRestaurant: true,
        });
      });
    }
  });
  let selectSql2 = `SELECT FoodName , RestaurantID from  FoodItems where FoodName
   like '%${req.body.input}%'  or CuisineType like '%${req.body.input}%'`;

  con.query(selectSql2, (err, result2) => {
    if (err) throw err;

    if (result2) {
      let tempList = [];
      let tempObject = {};

      result2.forEach((value) => {
        if (tempObject[value.FoodName]) {
          tempObject[value.FoodName].push(value.RestaurantID);
        } else {
          let restIDsList = [];
          restIDsList.push(value.RestaurantID);
          tempObject[value.FoodName] = restIDsList;
        }
      });

      Object.keys(tempObject).forEach((keyVal) => {
        listOfTypeahead.push({
          name: keyVal,
          id: tempObject[keyVal],
          isRestaurant: false,
        });
      });

      res.send(listOfTypeahead);
    }
  });
};

module.exports = getTypeaheadList;

const con = require("../../Controller/Common/dbConnection");

const getTypeaheadList = (req, res) => {
  let listOfTypeahead = [];

  let flag;

  if (req.body.deliveryType === "delivery") {
    flag = "DeliveryFlag";
  } else {
    flag = "PickupFlag";
  }

  let selectSql0 = `SELECT RestaurantID, City FROM RestaurantDetails where City like '%${req.body.input}%'  and   ${flag} = ?`;

  con.query(selectSql0, ["Yes"], (err, result0) => {
    if (err) throw err;

    if (result0) {
      let tempObject = {};

      result0.forEach((v) => {
        tempObject[v.City]
          ? tempObject[v.City].push(v.RestaurantID)
          : (tempObject[v.City] = [v.RestaurantID]);
      });

      Object.keys(tempObject).forEach((keyValue) => {
        listOfTypeahead.push({
          name: keyValue,
          id: tempObject[keyValue],
          isRestaurant: false,
        });
      });
    }
  });

  let selectSql1 = `SELECT * FROM RestaurantDetails where RestaurantName like '%${req.body.input}%'  and   ${flag} = ?`;

  con.query(selectSql1, ["Yes"], (err, result1) => {
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
  let selectSql2 = `SELECT F.FoodName , R.RestaurantID , R.City from  FoodItems F, RestaurantDetails  R where F.RestaurantID = R.RestaurantID and  (FoodName
   like '%${req.body.input}%'  or CuisineType like '%${req.body.input}%'   ) AND   R.${flag} = ?`;

  con.query(selectSql2, ["Yes"], (err, result2) => {
    if (err) throw err;

    if (result2) {
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

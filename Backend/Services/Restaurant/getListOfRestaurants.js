const con = require("../../Controller/Common/dbConnection");
const sortListOfRestaurants = require("./sortListOfRestaurants");
let selectSql;
let columnsArray;

const getListOfRestaurants = (req, res) => {
  let customerId = 1;

  // console.log(req.body.filter);

  let custSql = `SELECT City from CustomerDetails where CustomerID=?`;

  // console.log(req.body.filter.length);
  if (req.body.filter.length === 0) {
    selectSql = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture from RestaurantDetails`;
    columnsArray = [];
  }
  // if (req.body.filter.length > 0)
  else {
    selectSql = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture from 
    RestaurantDetails where RestaurantID in (SELECT distinct RestaurantID from FoodItems where FoodType in  (?)) `;
    columnsArray = req.body.filter;
  }

  let customerLocation;

  con.query(custSql, [customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      result = JSON.parse(JSON.stringify(result));
      customerLocation = result[0].City;
      // res.send(customerLocation);
    }
    // console.log(selectSql);
    let orderOfRestaurants;
    con.query(selectSql, columnsArray, (err, resultLast) => {
      if (err) throw err;

      if (resultLast) {
        orderOfRestaurants = sortListOfRestaurants(
          resultLast,
          customerLocation
        );
      }

      res.send(orderOfRestaurants);
    });
  });
};

module.exports = getListOfRestaurants;

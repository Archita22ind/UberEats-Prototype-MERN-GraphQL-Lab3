const con = require("../../Controller/Common/dbConnection");
const sortListOfRestaurants = require("./sortListOfRestaurants");
let selectSql;
let columnsArray;

const getListOfRestaurants = (req, res) => {
  let customerId = 1;

  let custSql = `SELECT City from CustomerDetails where CustomerID=?`;

  if (req.body.filter.length === 0 && req.body.typeaheadValue.length === 0) {
    selectSql = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture from RestaurantDetails`;
    columnsArray = [];
  } else if (
    req.body.filter.length > 0 &&
    req.body.typeaheadValue.length === 0
  ) {
    selectSql = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture from 
    RestaurantDetails where RestaurantID in (SELECT distinct RestaurantID from FoodItems where FoodType in  (?)) `;
    columnsArray = [];
    columnsArray = req.body.filter;
  } else if (req.body.filter.length > 0 && req.body.typeaheadValue.length > 0) {
    selectSql = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture from RestaurantDetails where RestaurantID in (SELECT distinct RestaurantID from FoodItems where FoodType in  (?)  and RestaurantID in  (?)) `;
    columnsArray = [];
    columnsArray.push(...req.body.filter, ...req.body.typeaheadValue);
  } else if (
    req.body.filter.length === 0 &&
    req.body.typeaheadValue.length > 0
  ) {
    selectSql = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture from 
    RestaurantDetails where RestaurantID in (?)) `;
    columnsArray = [];
    columnsArray = req.body.typeaheadValue;
  }

  let customerLocation;

  con.query(custSql, [customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      result = JSON.parse(JSON.stringify(result));
      customerLocation = result[0].City;
      // res.send(customerLocation);
    }

    let orderOfRestaurants;
    con.query(selectSql, columnsArray, (err, resultLast) => {
      if (err) throw err;

      if (resultLast) {
        con.query(
          "SELECT RestaurantID FROM CustomerFavorites where CustomerID = (?)",
          [customerId],
          (err, resultFavRest) => {
            if (err) throw err;

            let restaurantFavIds = resultFavRest.map((restau) => {
              return restau.RestaurantID;
            });

            if (resultFavRest) {
              orderOfRestaurants = sortListOfRestaurants(
                resultLast.map((restuarant) => {
                  let isLiked = false;

                  if (restaurantFavIds.includes(restuarant.RestaurantID)) {
                    isLiked = true;
                  }
                  return {
                    ...restuarant,
                    isLiked: isLiked,
                  };
                }),
                customerLocation
              );

              res.send(orderOfRestaurants);
            }
          }
        );
      }
    });
  });
};

module.exports = getListOfRestaurants;

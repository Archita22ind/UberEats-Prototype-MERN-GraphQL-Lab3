const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

//API to food details on the restaurant page

const getListOfRestaurants = (req, res, err) => {
  let customerId = 1;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  let custSql = `SELECT City from CustomerDetails where CustomerID=?`;
  let sqlSelect = `SELECT RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture  from RestaurantDetails`;

  let customerLocation;

  con.query(custSql, [customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      result = JSON.parse(JSON.stringify(result));
      customerLocation = result[0].City;
      // res.send(customerLocation);
    }

    let arrayOfRestaurants;
    con.query(sqlSelect, (err, result1) => {
      if (err) throw err;
      if (result1) {
        arrayOfRestaurants = JSON.parse(JSON.stringify(result1));
      }
      let customerLocationRestaurants = arrayOfRestaurants.filter(
        (restuarant) => restuarant.City === customerLocation
      );

      let orderOfRestaurants = [...customerLocationRestaurants];

      let differentLocationRestaurants = arrayOfRestaurants.filter(
        (restuarant) => restuarant.City !== customerLocation
      );

      orderOfRestaurants = [
        ...orderOfRestaurants,
        ...differentLocationRestaurants,
      ];
      res.send(orderOfRestaurants);
    });
  });
};

module.exports = getListOfRestaurants;

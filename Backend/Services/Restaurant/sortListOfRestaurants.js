const sortListOfRestaurants = (result, customerLocation) => {
  let arrayOfRestaurants = JSON.parse(JSON.stringify(result));

  let customerLocationRestaurants = arrayOfRestaurants.filter(
    (restuarant) => restuarant.City === customerLocation
  );

  let orderOfRestaurants = [...customerLocationRestaurants];

  let differentLocationRestaurants = arrayOfRestaurants.filter(
    (restuarant) => restuarant.City !== customerLocation
  );

  orderOfRestaurants = [...orderOfRestaurants, ...differentLocationRestaurants];

  return orderOfRestaurants;
};

module.exports = sortListOfRestaurants;

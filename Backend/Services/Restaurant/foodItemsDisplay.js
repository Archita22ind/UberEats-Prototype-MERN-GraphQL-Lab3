const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const foodItemsDisplay = (req, res, err) => {
  let id = req.query.restaurantId;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  let sqlSelect = `SELECT  F.FoodID,F.RestaurantID, F.FoodName, F.Price, F.Description, F.FoodType, F.FoodCategory, F.MainIngredients, F.CuisineType, F.FoodImage, R.RestaurantName 
  from FoodItems F, RestaurantDetails R where F.RestaurantID  =R.RestaurantID and F.RestaurantID = ?`;

  con.query(sqlSelect, [id], (err, result) => {
    let responseList = result.map((row) => {
      return {
        foodId: row.FoodID,
        restaurantId: row.RestaurantID,
        dishName: row.FoodName,
        price: row.Price,
        description: row.Description,
        dishType: row.FoodType,
        dishCategory: row.FoodCategory,
        mainIngredients: row.MainIngredients,
        cuisine: row.CuisineType,
        image: row.FoodImage,
        restaurantName: row.RestaurantName,
      };
    });

    if (err) throw err;
    if (result) {
      res.send(responseList);
    }
  });
};

module.exports = foodItemsDisplay;

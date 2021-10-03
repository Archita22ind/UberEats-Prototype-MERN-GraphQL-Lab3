const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

const foodItemsDisplay = (req, res, err) => {
  let id = req.query.restaurantId;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  let sqlSelect = `SELECT  FoodID,RestaurantID, FoodName, Price, Description, FoodType, FoodCategory, MainIngredients, CuisineType, FoodImage from FoodItems where RestaurantID = ?`;

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
      };
    });

    if (err) throw err;
    if (result) {
      res.send(responseList);
    }
  });
};

module.exports = foodItemsDisplay;

const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

//API to edit food details on the restaurant page
const editFoodItems = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  con.query(
    `SELECT * FROM FoodItems WHERE RestaurantID = ? AND FoodID = ?`,
    [req.body.restaurantId, req.body.foodId],
    (err, result) => {
      if (err) throw err;

      if (result.length === 1) {
        let currentValues = result[0];

        let updateImage;

        let updateSql = `UPDATE FoodItems SET  FoodName = ?, Price= ?, Description=?,FoodType=? , 
  FoodCategory =?, MainIngredients=?, CuisineType=? , FoodImage=? WHERE  RestaurantID = ? AND FoodID = ?`;

        if (req.file?.filename) updateImage = req.file.filename;
        else updateImage = currentValues.FoodImage;

        let data = [
          req.body.dishName || currentValues.FoodName,
          req.body.price || currentValues.Price,
          req.body.description || currentValues.Description,
          req.body.dishType || currentValues.FoodType,
          req.body.dishCategory || currentValues.FoodCategory,
          req.body.mainIngredients || currentValues.MainIngredients,
          req.body.cuisine || currentValues.CuisineType,
          updateImage,
          req.body.restaurantId,
          req.body.foodId,
        ];

        con.query(updateSql, data, (err, result) => {
          if (err) throw err;
        });

        return res.status(200).send({
          responseFlag: "Success",
        });
      }
    }
  );
};

module.exports = editFoodItems;

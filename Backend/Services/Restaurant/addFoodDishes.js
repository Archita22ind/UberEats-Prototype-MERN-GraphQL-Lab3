const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

//API to food details on the restaurant page
const addFoodDishes = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  let sql = `INSERT INTO FoodItems (RestaurantID, FoodName, Price, Description,FoodType,
            FoodCategory, MainIngredients, CuisineType, FoodImage )  VALUES (?,?,?,?,?,?,?,?,?)`;

  let data = [
    req.body.restaurantId,
    req.body?.dishName,
    req.body?.price,
    req.body?.description,
    req.body?.dishType,
    req.body?.dishCategory,
    req.body?.mainIngredients,
    req.body?.cuisine,
    req.file?.filename,
  ];

  con.query(sql, data, (err, result) => {
    if (err) throw err;
  });

  return res.status(200).send({ message: "Dish Added" });
};

module.exports = addFoodDishes;

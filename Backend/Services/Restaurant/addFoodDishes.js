const con = require("../../Controller/Common/dbConnection");
const multer = require("multer");

//API to food details on the restaurant page
 const addFoodDishes =(req, res, err) =>{

  console.log(req.file);
  console.log("Abhi", req.body);

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

        let sql = `INSERT INTO FoodItems (RestaurantID, FoodName, Price, Description,FoodType,
            FoodCategory, MainIngredients, CuisineType, FoodImage )  VALUES (?,?,?,?,?,?,?,?,?)`;
    
        let data = [
          req.body.restaurantId,
          req.body.dishName,
          req.body.price,
          req.body.description,
          req.body.dishType,
          req.body.dishCategory,
          req.body.mainIngredients,
          req.body.cuisine,
          req.file.filename
        ];
    
          con.query(sql, data, (err, result) => {
            if (err) throw err;
            console.log("1 food item record created on restaurant's page");
          });
 
        return res.status(200).send(req.file);
      };

      module.exports = addFoodDishes;
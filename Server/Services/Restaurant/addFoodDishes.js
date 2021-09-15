
//API to food details on the restaurant page
app.post("/addFoodItems", function (req, res) {

    upload(req, res, function (err) {

        let sql = `INSERT INTO FoodItems (RestaurantID, FoodName, Price, Description,FoodType,
            FoodCategory, MainIngredients, CuisineType, FoodImage )  VALUES (?,?,?,?,?,?,?,?,?)`;
    
        let data = [
          req.body.restaurantId,
          req.body.foodName,
          req.body.price,
          req.body.description,
          req.body.foodType,
          req.body.foodCategory,
          req.body.mainIngredients,
          req.body.cuisineType,
          req.file.filename
        ];
    
        con.connect(function (err) {
          if (err) throw err;
          console.log("Connected!");
          con.query(sql, data, (err, result) => {
            if (err) throw err;
            console.log("1 food item record created on restaurant's page");
          });
        });
    
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
      });
    });
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const con = require("./Controller/Common/dbConnection");
const restaurantSignUpInfo = require("./Services/Restaurant/restaurantSignUpInfo");
const restaurantLoginInfo = require("./Services/Restaurant/restaurantLoginInfo");
const restaurantDetailsInfo = require("./Services/Restaurant/restaurantDetailsInfo");
const restaurantDetailsInfoUpdate = require("./Services/Restaurant/restaurantDetailsInfoUpdate");
const getTypeaheadList = require("./Services/Restaurant/getTypeaheadList");
const getListOfRestaurants = require("./Services/Restaurant/getListOfRestaurants");
const customerSignUpInfo = require("./Services/Customer/customerSignUpInfo");
const updateProfileInfo = require("./Services/Customer/updateProfileInfo");
const getProfileInfo = require("./Services/Customer/getProfileInfo");
const addFoodDishes = require("./Services/Restaurant/addFoodDishes");
const editFoodDishes = require("./Services/Restaurant/editFoodDishes");
const foodItemsDisplay = require("./Services/Restaurant/foodItemsDisplay");
const createFavouritesList = require("./Services/Customer/createFavouritesList");
const customerSignIn = require("./Services/Customer/customerSignIn");
const addOrdertoCart = require("./Services/Restaurant/addOrdertoCart");
const showCartDetails = require("./Services/Customer/showCartDetails");
const updateCartOrderDetails = require("./Services/Customer/updateCartOrderDetails");
const placeFinalOrder = require("./Services/Customer/placeFinalOrder");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    console.log("File name : ", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/restaurantLoginInfo", restaurantLoginInfo);

app.post("/customerSignIn", customerSignIn);

app.post("/restaurantSignUpInfo", restaurantSignUpInfo);
app.post("/customerSignUpInfo", customerSignUpInfo);

app.post("/addFoodItems", upload.single("file"), addFoodDishes);
app.post("/editFoodItems", upload.single("file"), editFoodDishes);

app.get("/foodItemsDisplay", upload.single("file"), foodItemsDisplay);

app.get("/restaurantDetailsInfo", upload.single("file"), restaurantDetailsInfo);

app.post(
  "/restaurantDetailsInfoUpdate",
  upload.single("file"),
  restaurantDetailsInfoUpdate
);
app.get("/getProfileInfo", upload.single("file"), getProfileInfo);

app.post("/updateProfileInfo", upload.single("file"), updateProfileInfo);

app.post("/getListOfRestaurants", getListOfRestaurants);

app.post("/getTypeaheadList", getTypeaheadList);

app.post("/createFavouritesList", createFavouritesList);

app.post("/addOrdertoCart", addOrdertoCart);

app.post("/showCartDetails", showCartDetails);

app.post("/updateCartOrderDetails", updateCartOrderDetails);

app.post("/placeFinalOrder", placeFinalOrder);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;

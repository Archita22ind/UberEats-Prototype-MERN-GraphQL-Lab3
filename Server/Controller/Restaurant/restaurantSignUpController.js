const app = require("../Common/app");
const restaurantSignUpInfo = require("../../Services/Restaurant/restaurantSignUp");

app.post("/restaurantSignUpInfo", upload.single("file"), restaurantSignUpInfo);
import RestaurantSignUp from "./restaurant/restaurantsignUp";
import RestaurantLogin from "./restaurant/restaurantLogin";
import CustomerLogin from "./customer/customerLogin";
import CustomerSignUp from "./customer/customerSignUp";
import HomePage from "./common/homePage";
import ProtectedRouter from "./common/protectedRouter";
import "./styling/App.css";
import { BrowserRouter as Router, Route, Switch , useHistory } from "react-router-dom";
import React, { useState , useEffect} from "react";
import { SessionContext, getSessionCookie } from "./common/session";
import * as Cookies from "js-cookie";
import Routes from "./common/routes";

function App() {
    return (
      <div className="App">
       <Routes/>
      </div>
    );
    
}

export default App;



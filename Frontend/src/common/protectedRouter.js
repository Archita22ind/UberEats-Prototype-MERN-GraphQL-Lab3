import RestaurantSearch from "../customer/restaurantSearch";
import RestaurantDetails from "../restaurant/restaurantDetails";
import ProfileInfo from "../customer/profileInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useContext } from "react";

import { SessionContext, getSessionCookie } from "./session";


const ProtectedRouter = ({ history }) => {
    // const session = useContext(SessionContext);
    const session = getSessionCookie();
    console.log("Session Cookie Value", session);
    if (session.emailId === undefined) {
        console.log("I am in protected Router");
      history.push("/");
      return <div></div>
    } else {
        return (
            <>
              <Route path="/restaurantDetails" component={RestaurantDetails} />
              <Route path="/restaurantSearch" component={RestaurantSearch} />
              <Route path="/profileInfo" component={ProfileInfo} />
            </>
        );
    }
  
  };

  export default ProtectedRouter;
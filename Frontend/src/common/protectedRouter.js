import RestaurantSearch from "../customer/restaurantSearch";
import RestaurantDetails from "../restaurant/restaurantDetails";
import ProfileInfo from "../customer/profileInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useContext } from "react";

import { SessionContext, getSessionCookie } from "./session";
import MainHeader from "./mainHeader";

const ProtectedRouter = ({ history }) => {
  // const session = useContext(SessionContext);
  const session = getSessionCookie();
  console.log("Session Cookie Value", session);
  if (session.primaryID === undefined) {
    console.log("I am in protected Router");
    history.push("/");
    return <div></div>;
  } else {
    return (
      <>
        <Route path="/restaurantDetails" component={<RestaurantDetails />} />
        <Route
          path="/customerRestaurantDetails"
          render={() => <MainHeader search={false} />}
        />
        <Route
          path="/restaurantSearch"
          render={() => <MainHeader search={true} />}
        />
        <Route path="/profileInfo" component={ProfileInfo} />
      </>
    );
  }
};

export default ProtectedRouter;

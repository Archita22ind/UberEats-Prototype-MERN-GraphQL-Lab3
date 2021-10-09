import { Row, Col, Button, ToggleButton, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Holder from "../images/holder.png";
import React, { useState, useEffect } from "react";
import { getSessionCookie } from "../common/session";
import RestaurantList from "../customer/restaurantList.js";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const Favorites = (props) => {
  const [favoriteList, setFavoriteList] = useState([]);

  const session = getSessionCookie();

  const getFavoriteRestaurants = async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getFavoriteRestaurants`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: session.primaryID,
          }),
        }
      );

      let data = await response.json();

      props.setRestaurantList(
        data.map((d) => {
          return {
            ...d,
            isLiked: true,
            imagePreview:
              `http://${NODE_HOST}:${NODE_PORT}/` + d.ProfilePicture,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavoriteRestaurants();
  }, []);

  return (
    <Container>
      <h1>Favorite Restaurants</h1>
      <RestaurantList
        restaurantList={props.restaurantList}
        getFavoriteRestaurants={getFavoriteRestaurants}
      />
    </Container>
  );
};

export default Favorites;

import { Row, Col, Button, ToggleButton } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Holder from "../images/holder.png";
import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

const RestaurantList = (props) => {
  const customer_id = 1;

  const [favorite, setFavorite] = useState([]);

  const viewImageHandler = (restaurant) => {
    if (restaurant.imagePreview) {
      return (
        <Card style={{ width: "15rem" }}>
          <Card.Img
            variant="top"
            src={restaurant.imagePreview}
            height="200px"
          />
        </Card>
      );
    } else {
      return (
        <Card style={{ width: "15rem" }}>
          <Card.Img variant="top" src={Holder} height="200px" />
        </Card>
      );
    }
  };

  const createFavouritesList = async (restaurantId) => {
    ///write a post APi to store fav

    setFavorite((prevState) => {
      return [...prevState, restaurantId];
    });

    try {
      const response = await fetch(
        "http://10.0.0.8:8080/createFavouritesList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favorite),
        }
      );
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createFavouritesList();
  }, []);

  return (
    <Row>
      {props.restuarantList.map((restaurant, key) => {
        return (
          <Col xs={12} md={3} className="mb-4">
            <Card>
              <Link
                to="/customerRestaurantDetails"
                style={{ textDecoration: "none", color: "black" }}
              >
                {viewImageHandler(restaurant)}
                <Card.Header>{restaurant.RestaurantName}</Card.Header>
              </Link>
              <font size="1">
                {/* <Card.Body>{restaurant.About}</Card.Body> */}
                <Card.Footer>
                  {restaurant.City}, {restaurant.State} {"                  "}
                  <Button
                    // name={restaurant.RestaurantName}
                    variant={"danger"}
                    onClick={(event) =>
                      createFavouritesList(restaurant.RestaurantID)
                    }
                  >
                    <BsFillHeartFill />
                    <BsHeart />
                  </Button>
                </Card.Footer>
              </font>
            </Card>
          </Col>
        );
      })}{" "}
    </Row>
  );
};

export default RestaurantList;

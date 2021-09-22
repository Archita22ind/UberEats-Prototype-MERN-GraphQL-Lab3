import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Holder from "../images/holder.png";
import React, { useState, useEffect } from "react";

const RestaurantList = () => {
  const customer_id = 1;

  const [restuarantList, setRestaurantList] = useState([]);

  let getListOfRestaurants = async () => {
    const response = await fetch("http://10.0.0.8:8080/getListOfRestaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset= UTF-8",
        Accept: "application/json, text/html, image/png",
      },
    });

    let data = await response.json();

    setRestaurantList(
      data.map((d) => {
        return {
          ...d,
          imagePreview: "http://10.0.0.8:8080/" + d.ProfilePicture,
        };
      })
    );
  };

  console.log("new list", restuarantList);
  //   useEffect(() => {
  //     getListOfRestaurants(); //3rd party effects
  //   }, [getListOfRestaurants]);

  useEffect(() => {
    getListOfRestaurants(); //3rd party effects
  }, []);

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

  return (
    <Row>
      {restuarantList.map((restaurant, key) => {
        return (
          <Col xs={12} md={3} className="mb-4">
            <Link
              to="/restaurantDetails"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card>
                {viewImageHandler(restaurant)}
                <Card.Header>{restaurant.RestaurantName}</Card.Header>
                <font size="1">
                  <Card.Body>
                    {restaurant.City}, {restaurant.State}
                  </Card.Body>
                </font>
              </Card>
            </Link>
          </Col>
        );
      })}{" "}
    </Row>
  );
};

export default RestaurantList;

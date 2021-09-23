import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Holder from "../images/holder.png";
import React, { useState, useEffect } from "react";

const RestaurantList = (props) => {
  const customer_id = 1;

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
      {props.restuarantList.map((restaurant, key) => {
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

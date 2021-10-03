import "../styling/customer/restaurantSearch.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import RestaurantList from "./restaurantList.js";
import React, { useState, useEffect } from "react";

const RestaurantSearch = (props) => {
  const onFilterCheckHandler = (event) => {
    props.setFoodFilter((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });
    fetchFilteredRestaurants();
  };

  const fetchFilteredRestaurants = async () => {
    try {
      const response = await fetch(
        "http://10.0.0.8:8080/getListOfRestaurants",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filter: Object.keys(props.foodFilter).filter(
              (keyValue) => props.foodFilter[keyValue]
            ),
            typeaheadValue: props.typeaheadValue[0].id
              ? props.typeaheadValue[0].id
              : [],
          }),
        }
      );

      let data = await response.json();

      props.setRestaurantList(
        data.map((d) => {
          return {
            ...d,
            imagePreview: "http://10.0.0.8:8080/" + d.ProfilePicture,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredRestaurants();
  }, [props.foodFilter, props.typeaheadValue]); //TO DO: ADD a react use callback here

  return (
    <>
      <Container fluid className="mt-5">
        <Row>
          <Col xs={12} md={2}>
            <Row>
              <Col>
                <h4
                  style={{
                    textAlign: "left",
                  }}
                >
                  Filters
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5
                  style={{
                    textAlign: "left",
                  }}
                >
                  Dietary
                </h5>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="formBasicCheckboxV">
                  <Form.Check
                    name="Vegan"
                    type="checkbox"
                    label={<h6>Vegan</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="formBasicCheckboxVeg">
                  <Form.Check
                    type="checkbox"
                    name="Vegetarian"
                    label={<h6>Vegetarian</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                {" "}
                <Form.Group className="mb-3" controlId="formBasicCheckboxNV">
                  <Form.Check
                    name="Non-Vegetarian"
                    type="checkbox"
                    label={<h6>Non-Vegetarian</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="formBasicCheckboxH">
                  <Form.Check
                    name="Halal"
                    type="checkbox"
                    label={<h6>Halal</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="formBasicCheckboxGF">
                  <Form.Check
                    name="Gluten-Free"
                    type="checkbox"
                    label={<h6>Gluten-free</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={10}>
            <RestaurantList
              restaurantList={props.restaurantList}
              fetchFilteredRestaurants={fetchFilteredRestaurants}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RestaurantSearch;

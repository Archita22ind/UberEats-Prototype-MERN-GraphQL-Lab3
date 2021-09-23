import "../styling/customer/restaurantSearch.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import * as Icon from "react-bootstrap-icons";
import RestaurantList from "./restaurantList.js";
import React, { useState, useEffect } from "react";
import MainHeader from "../common/mainHeader";

const RestaurantSearch = (props) => {
  const [foodFilter, setFoodFilter] = useState([]);
  const [restuarantList, setRestaurantList] = useState([]);
  const [typeahead, setTypeAhead] = useState("");

  const onFilterCheckHandler = (event) => {
    setFoodFilter((prevState) => {
      return [...prevState, event.target.name];
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
            filter: foodFilter,
          }),

          // typeaheadString: JSON.stringify(typeahead),
        }
      );

      let data = await response.json();
      console.log(data);

      setRestaurantList(
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
  }, [foodFilter]);

  return (
    <>
      <MainHeader />
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
            <RestaurantList restuarantList={restuarantList} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RestaurantSearch;

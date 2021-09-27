import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import * as Icon from "react-bootstrap-icons";
import Navbar from "../styling/Navbar.js";
import CartCheckoutModal from "./cartCheckoutModal.js";
import { Link } from "react-router-dom";
import RestaurantSearch from "../customer/restaurantSearch";
import RestaurantDetails from "../restaurant/restaurantDetails";
import { useHistory } from "react-router-dom";

const MainHeader = (props) => {
  let locationName = "San Jose";
  let showSearchPage = props.search;
  const [modalShow, setModalShow] = useState(false);
  // const [typeaheadInput, setTypeaheadInput] = useState("");
  const [typeaheadOutput, setTypeaheadOutput] = useState([]);
  const [valueSelected, setValueSelected] = useState([{}]);
  const [foodFilter, setFoodFilter] = useState({});
  const [restuarantList, setRestaurantList] = useState([]);

  const history = useHistory();

  const inputChangeHandler = (input, event) => {
    event.preventDefault();

    optionDislayHandler(input);
    // I cannot have this function here, BAD PRACTICE,
  };

  const onChangeHandler = (selected) => {
    setValueSelected(selected);
    console.log("Selected", selected);
    if (selected[0].isRestaurant) {
      history.push("/customerRestaurantDetails");
    } else {
      if (!showSearchPage) history.push("/restaurantSearch");
    }
  };

  const optionDislayHandler = async (typeaheadInput) => {
    try {
      const response = await fetch("http://10.0.0.8:8080/getTypeaheadList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: typeaheadInput,
        }),
      });

      let data = await response.json();
      console.log("my data", data);

      setTypeaheadOutput(() => {
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderPages = (search) => {
    return search ? (
      <RestaurantSearch
        foodFilter={foodFilter}
        setFoodFilter={setFoodFilter}
        restuarantList={restuarantList}
        setRestaurantList={setRestaurantList}
        typeaheadValue={valueSelected}
      />
    ) : (
      <RestaurantDetails />
    );
  };

  return (
    <>
      <Container fluid className="my-3">
        <Row>
          <Col xs={3} md={1}>
            <Navbar />
          </Col>
          <Col className="mt-3" xs={4} md={2}>
            <Link
              to="/restaurantSearch"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <h3>Uber Eats</h3>{" "}
            </Link>
          </Col>
          <Col className="mt-3" xs={4} md={2}>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={1}
              // value={value} onChange={handleChange}
            >
              <ToggleButton variant="outline-dark" id="tbg-radio-1" value={1}>
                <font size="2"> Delivery</font>
              </ToggleButton>
              <ToggleButton variant="outline-dark" id="tbg-radio-2" value={2}>
                <font size="2"> Pickup</font>
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col className="mt-3" xs={4} md={2}>
            <Button variant="outline-dark">
              <Icon.GeoAltFill /> <font size="2"> {locationName}</font>
            </Button>
          </Col>
          <Col className="mt-3" xs={12} md={3}>
            <Typeahead
              id="id123"
              labelKey={(option) => `${option.name}`}
              // labelKey="label"
              maxResults={8}
              paginate={false}
              placeholder="What are you craving for?"
              onChange={onChangeHandler}
              onInputChange={inputChangeHandler}
              options={typeaheadOutput}
              selected={valueSelected.name}
            />
          </Col>
          <Col className="mt-3" xs={4} md={2}>
            <Button variant="dark" onClick={() => setModalShow(true)}>
              <Icon.CartPlus />
              <font size="2"> Cart</font>
            </Button>
            <CartCheckoutModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
      </Container>
      {renderPages(showSearchPage)}
    </>
  );
};

export default MainHeader;

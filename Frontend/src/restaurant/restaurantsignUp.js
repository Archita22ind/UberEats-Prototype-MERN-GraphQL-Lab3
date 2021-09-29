import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Background from "../images/restaurantSignUp.jpeg";
import countryList from "react-select-country-list";
import { setSessionCookie } from "../common/session";
import { useHistory } from "react-router-dom";

const RestaurantSignUp = (props) => {
  let countryArray = ["..."];
  countryArray.push(...countryList().getLabels());
  const history = useHistory();

  const options = countryArray.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const [restaurantDetails, setRestaurantDetails] = useState({});
  // let passwordOkay ;
  // let checkPassword;
  // const re = new RegExp("^(?=.)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");

  const onChangeHandler = (event) => {
    event.preventDefault();

    // if(event.target.name === 'password')
    // {
    //     checkPassword=  event.target.value;
    //     passwordOkay = re.test(checkPassword)
    // }

    // ensures I always get the latest state
    setRestaurantDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });

    // setRestaurantDetails({
    //   ...restaurantDetails,
    //   [event.target.name]: event.target.value
    // });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if(!passwordOkay)
    // return alert('Weak Password! Try a new one!');

    try {
      const response = await fetch(
        "http://10.0.0.8:8080/restaurantSignUpInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...restaurantDetails,
          }),
        }
      );

      const data = await response.json();
      // enter you logic when the fetch is successful
      setSessionCookie(
        JSON.stringify({
          primaryID: data.restaurantId,
          restaurantFlag: true,
        })
      );
      history.push("/customerRestaurantDetails");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "lightgrey",
      }}
    >
      <Row className="m-3" style={{ backgroundColor: "grey" }}>
        <h1>Uber Eats for Restaurants</h1>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Image src={Background} height="75%" width="92%" />
        </Col>
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridRestaurantName">
                <Form.Label>Restaurant Name</Form.Label>
                <Form.Control
                  required
                  name="restaurantName"
                  placeholder="Enter name"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  name="emailId"
                  type="email"
                  placeholder="Enter email"
                  onChange={onChangeHandler}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Valid format : user@xxxx.com
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  type="password"
                  placeholder="Password"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  onChange={onChangeHandler}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Password must be 8-20 characters long and not contain
                  spaces/special characters
                </Form.Text>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                name="address"
                placeholder="1234 Main St"
                onChange={onChangeHandler}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group> */}

            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control required name="city" onChange={onChangeHandler} />
              </Form.Group>

              <Form.Group required as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  name="state"
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  required
                  name="zipCode"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group required as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="country"
                  as="select"
                  onChange={onChangeHandler}
                  custom
                >
                  ...
                  {options}
                </Form.Control>
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-2"
                controlId="formGridContactNumber"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  required
                  name="contactNumber"
                  placeholder="+1 ()"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Button variant="dark" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
        {/* 
        <Col md={3}></Col> */}
      </Row>
    </Container>
  );
};

export default RestaurantSignUp;

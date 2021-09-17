import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Background from "../images/restaurantSignUp.jpeg"

const CustomerSignUp = (props) => {
  const [customerDetails, setCustomerDetails] = useState({});

  const onChangeHandler = (event) => {
    event.preventDefault();

    setCustomerDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });

  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://10.0.0.8:8080/customerSignUpInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...customerDetails,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="m-3">
        <Col style={{ backgroundColor: "grey" }}>
          <h1>Uber Eats for Customers</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <Image src={Background} />
         </Col>
        <Col md={6}>
          <Form onSubmit={onSubmitHandler}>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  placeholder="Enter first name"
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  placeholder="Enter last name"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="emailId"
                  type="email"
                  placeholder="Enter email"
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            {/* <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                placeholder="1234 Main St"
                onChange={onChangeHandler}
              />
            </Form.Group> */}

            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group> */}

            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control name="city" onChange={onChangeHandler} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  name="state"
                  onChange={onChangeHandler}
                >
                  <option>Choose..</option>
                  <option value="AK">Alaska</option>
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country"
                  onChange={onChangeHandler}
                >
                  <option>Choose..</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="AU">Australia</option>
                </Form.Select>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control name="zipCode" onChange={onChangeHandler} />
              </Form.Group> */}
            </Row>
            <Row>
              <Form.Group
                as={Col}
                className="mb-2"
                controlId="formGridContactNumber"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
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

export default CustomerSignUp;

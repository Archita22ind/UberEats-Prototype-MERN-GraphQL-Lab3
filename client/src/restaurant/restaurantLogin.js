import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Container, Card} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link} from 'react-router-dom';
import Background from "../images/restaurantSignUp.jpeg";

const RestaurantLogin = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onEmailChangeHandler = (event) => {
    event.preventDefault();
    setUserEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    event.preventDefault();
    setUserPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://10.0.0.8:8080/restaurantSignIn", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: userEmail,
          password: userPassword,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container>
      <Row fuild className="mt=10">
        <Col md={7}>
          <Image src={Background} />
        </Col>

        <Col>
          <p></p>
          <Card>
            <Row>
              <h1 style={{ backgroundColor: "grey" }}>Restaurant Login</h1>
            </Row>
            <Form onSubmit={onSubmitHandler}>
              <Row className="mb-3">
                <Row>
                  <Form.Group as={Col} controlId="formGridEmailId">
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control
                      name="emailId"
                      type="email"
                      placeholder="Enter email Id"
                      onChange={onEmailChangeHandler}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={onPasswordChangeHandler}
                    />
                  </Form.Group>
                </Row>
              </Row>
              <Button variant="dark" type="submit">
                Sign In
              </Button>
            </Form>
          </Card>
          <p></p>

          <Card fuild className="mt=5">
              <Form.Label>New User?</Form.Label>
              <Link to = "/restaurantSignUp"> 
              <Button variant="dark" type="submit">
                SignUp
              </Button>
              </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default RestaurantLogin;

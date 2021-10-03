import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Container, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Background from "../images/restaurantSignUp.jpeg";
import { setSessionCookie } from "../common/session";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants";
import { alertActions } from "../actions/alertActions";

function request(user) {
  return { type: reduxConstants.LOGIN_REQUEST, user };
}

function success(user) {
  return { type: reduxConstants.LOGIN_SUCCESS, user };
}

function failure(error) {
  return { type: reduxConstants.LOGIN_FAILURE, error };
}

const CustomerLogin = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

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

    dispatch(request({ userEmail }));

    try {
      const response = await fetch("http://10.0.0.8:8080/customerSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: userEmail,
          password: userPassword,
        }),
      });
      const data = await response.json();

      setSessionCookie(
        JSON.stringify({
          primaryID: data.customerID,
          restaurantFlag: false,
        })
      );
      dispatch(success({ userEmail }));
      dispatch(alertActions.success("Login Successful !!"));
      history.push("/restaurantSearch");
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error("Login Failed !!"));
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
              <h1 style={{ backgroundColor: "grey" }}>Customer Login</h1>
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
            <Link to="/customerSignUp">
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

export default CustomerLogin;

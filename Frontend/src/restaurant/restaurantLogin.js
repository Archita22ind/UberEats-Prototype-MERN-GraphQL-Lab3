import { useState } from "react";
import { Button, Row, Col, Form, Container, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Background from "../images/restaurantSignUp.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants";
import { useHistory } from "react-router-dom";
import { alertActions } from "../actions/alertActions";
import { setSessionCookie } from "../common/session";

function request(user) {
  return { type: reduxConstants.LOGIN_REQUEST, user };
}
function success(user) {
  return { type: reduxConstants.LOGIN_SUCCESS, user };
}
function failure(error) {
  return { type: reduxConstants.LOGIN_FAILURE, error };
}

const RestaurantLogin = (props) => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const loggingIn = useSelector((state) => state.authentication.loggingIn);

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
      const response = await fetch("http://10.0.0.8:8080/restaurantLoginInfo", {
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
          primaryID: data.restaurantId,
          restaurantFlag: true,
        })
      );
      dispatch(success(userEmail)); //TODO get from api response
      dispatch(alertActions.success("Login Successful !! "));
      history.push("/restaurantDetails");
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error("Login Failed !!"));
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={7}>
          <Image src={Background} height="75%" width="76%" />
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
                {loggingIn && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Sign In
              </Button>
            </Form>
          </Card>
          <p></p>

          <Card fuild className="mt=5">
            <Form.Label>New User?</Form.Label>
            <Link to="/restaurantSignUp">
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

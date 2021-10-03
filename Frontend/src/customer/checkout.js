import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getSessionCookie } from "../common/session";

const Checkout = () => {
  // const [deliveryAddress, setdeliveryAddress] = useState();
  const address = ["...", "Address1", "Address2"];
  const session = getSessionCookie();
  const [subTotal, setSubTotal] = useState(0);
  const [tip, setTip] = useState(0);
  const deliveryFee = 2.5;
  const tax = 3.5;

  const options = address.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const showOrderTotal = async () => {
    try {
      const response = await fetch(
        `http://10.0.0.8:8080/getOrderTotal?customerId=${session.primaryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("got this data", data);
      setSubTotal(data.TotalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const onTipPercentChangeHandler = (event) => {
    event.preventDefault();
    let tipValue = event.target.value;
    tipValue = tipValue / 100;
    console.log("tip value cal", event.target.value, subTotal, tipValue);
    setTip(tipValue * subTotal);
  };

  const onSubmitHandler = async () => {
    try {
      const response = await fetch("http://10.0.0.8:8080/bookOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: session.primaryID,
          total: subTotal + tip + tax + deliveryFee,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showOrderTotal();
  }, [subTotal, tip]);
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={7}>
          <Card>
            <Card.Header>Your Items</Card.Header>
            <Card.Body></Card.Body>
            <Card.Footer>
              <Form.Group as={Col}>
                <Form.Label>Select from below Delivery Address</Form.Label>
                <Form.Select
                  required
                  name="deliveryAddress"
                  //   as="select"
                  //   custom
                  //   onChange={onChangeHandler}
                >
                  {options}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Add a new Delivery Address</Form.Label>
                <Form.Control
                  required
                  name="deliveryAddressNew"
                  //   onChange={onChangeHandler}
                ></Form.Control>
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Form onSubmit={onSubmitHandler}>
              <Card.Header>
                <font size="4">
                  <Row className="mt-4">
                    <Button variant="success" type="submit">
                      Place Order
                    </Button>
                  </Row>
                </font>
                <Form.Text id="generalMessage" muted>
                  If you are not around when the delivery person arrives, they
                  will leave your order at the door. By placing you order you
                  agree to take full responsibility of it once it is delivered.
                </Form.Text>
              </Card.Header>
              <Card.Body className="mt-3">
                <Row>
                  <Col>Subtotal</Col>
                  <Col></Col>
                  <Col>${subTotal.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col> Delivery Fee</Col>
                  <Col></Col>
                  <Col>${deliveryFee.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col> Taxes</Col>
                  <Col></Col>
                  <Col>${tax.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>Add Tip %</Col>
                  <Col>
                    <Form.Select
                      name="tip"
                      size="sm"
                      onChange={onTipPercentChangeHandler}
                    >
                      <option value="0">0</option>
                      <option value="15">15</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </Form.Select>
                  </Col>
                  <Col>${tip.toFixed(2)}</Col>
                  <Form.Text id="generalMessage" muted>
                    Add a tip to say thanks to the delivery people
                  </Form.Text>
                </Row>
              </Card.Body>
              <Card.Footer className="mt-4">
                <font size="5">
                  <Row>
                    <Col> Total</Col>
                    <Col>
                      ${(deliveryFee + tip + subTotal + tax).toFixed(2)}
                    </Col>
                  </Row>
                </font>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

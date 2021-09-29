import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const Checkout = () => {
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={7}>
          <Card>
            <Card.Header>Your Items</Card.Header>
            <Card.Body></Card.Body>
            <Card.Footer>Select Delivery Address</Card.Footer>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Form>
              <Card.Header>
                <font size="4">
                  <Row className="mt-4">
                    <Button variant="success">Place Order</Button>
                  </Row>
                </font>
                <Form.Text id="generalMessage" muted>
                  If you are not around when the delivery person arrives, they
                  will leave your order at the door. By placing you order you
                  agree to take full responsibility of it once it is delivered.
                </Form.Text>
              </Card.Header>
              <Card.Body className="mt-3">
                <Row>Subtotal</Row>
                <Row>Delivery Fee</Row>
                <Row>Taxes</Row>
                <Row>
                  Add Tip
                  {/* <Form.Label>Add a tip</Form.Label> */}
                  <Col md={3}>
                    <Form.Select name="tip">
                      {/* onChange={onChangeHandler}> */}
                      <option value="15%">15%</option>
                      <option value="18%">18%</option>
                      <option value="20%">20%</option>
                      <option value="25%">25%</option>
                    </Form.Select>
                  </Col>
                  <Form.Text id="generalMessage" muted>
                    Add a tip to say thanks to the delivery people
                  </Form.Text>
                </Row>
              </Card.Body>
              <Card.Footer className="mt-4">
                <font size="5">
                  <Row>Total</Row>
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

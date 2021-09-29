import {
  Container,
  Row,
  ListGroup,
  Col,
  Modal,
  Button,
  DropdownButton,
  Dropdown,
  Form,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";

import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";

import { getSessionCookie } from "../common/session";

const CartCheckoutModal = (props) => {
  let totalAmount = 0.0;

  let restaurantName = "Your Cart is empty!!";
  const session = getSessionCookie();

  if (!session.restaurantFlag && props.cartDetails.length > 0) {
    restaurantName = props.cartDetails[0].RestaurantName;
  }

  const displaySelectedItems = () => {
    return props.cartDetails.map((item, key) => {
      return (
        <Row>
          <Col md={4}>{item.FoodName}</Col>
          <Col md={5}></Col>
          <Col md={3}> {`$${(item.Price * item.Quantity).toFixed(2)}`}</Col>
          {populateQuantityDropdown(item.Quantity, key)}
        </Row>
      );
    });
  };

  const onQuantityChangeHandler = async (value, key) => {
    let requestObj = { ...props.cartDetails[key] };
    requestObj.Quantity = value;

    try {
      const response = await fetch(
        "http://10.0.0.8:8080/updateCartOrderDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestObj),
        }
      );
      const data = await response.json();
      console.log(data);

      props.setCartDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = () => {
    props.cartDetails.forEach((element) => {
      totalAmount += element.Amount;
    });
    props.setCartTotal(totalAmount);
  };

  useEffect(() => calculateTotal(), [props.cartDetails]);

  const increment = (value, key) => {
    onQuantityChangeHandler(value + 1, key);
  };

  const decrement = (value, key) => {
    if (value >= 1) onQuantityChangeHandler(value - 1, key);
  };

  const populateQuantityDropdown = (dishQuantity, key) => {
    return (
      <Row>
        <Col md={1}>
          <BiPlus
            type="button"
            style={{ color: "white", backgroundColor: "black" }}
            onClick={(e) => increment(dishQuantity, key)}
          />
        </Col>
        <Col md={1}></Col>
        <Col md={2}>
          <Form>
            <Form.Text>{dishQuantity}</Form.Text>
          </Form>
        </Col>
        <Col md={1}>
          <BiMinus
            type="button"
            style={{ color: "white", backgroundColor: "black" }}
            onClick={(e) => decrement(dishQuantity, key)}
          />
        </Col>
      </Row>
    );
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      variant="dark"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {restaurantName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        variant="dark"
        // className="show-grid"
      >
        <Container>{displaySelectedItems()}</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Go to checkout : ${props.cartTotal.toFixed(2)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartCheckoutModal;

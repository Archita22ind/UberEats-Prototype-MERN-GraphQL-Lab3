import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { getSessionCookie } from "./session";

const useCartCheckoutModal = (modalShow, onHide) => {
  console.log("Show Modal" + modalShow);

  const [cartDetails, setCartDetails] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  let totalAmount = 0.0;

  let restaurantName = "Your Cart is empty!!";
  const session = getSessionCookie();
  const history = useHistory();

  if (!session.restaurantFlag && cartDetails.length > 0) {
    restaurantName = cartDetails[0].RestaurantName;
  }

  const displaySelectedItems = () => {
    return cartDetails.map((item, key) => {
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
    let requestObj = { ...cartDetails[key] };
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

      setCartDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // console.log("print cart total", cartTotal);
    // console.log("print cart details", cartDetails);
    try {
      const response = await fetch("http://10.0.0.8:8080/postToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartDetails),
      });

      const data = await response.json();

      history.push("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = () => {
    cartDetails.forEach((element) => {
      totalAmount += element.Amount;
    });
    setCartTotal(totalAmount);
  };

  useEffect(() => calculateTotal(), [cartDetails]);

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

  const getCartDetails = async () => {
    try {
      const response = await fetch("http://10.0.0.8:8080/showCartDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: session.primaryID,
        }),
      });
      const data = await response.json();
      setCartDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cartModal = () => {
    return (
      <Modal
        show={modalShow}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        variant="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {restaurantName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body variant="dark">
          <Container>{displaySelectedItems()}</Container>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={onSubmitHandler}>
            <Button variant="dark" type="submit" onClick={onHide}>
              Go to checkout : ${cartTotal.toFixed(2)}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  };

  return {
    cartModal,
    getCartDetails,
  };
};

export default useCartCheckoutModal;

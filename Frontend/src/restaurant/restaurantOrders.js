import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getSessionCookie } from "../common/session";
import ReceiptModal from "../customer/receiptModal";
import CustomerModal from "./customerModal";

const RestaurantOrders = () => {
  const session = getSessionCookie();
  const [restaurantOrdersList, setRestaurantOrdersList] = useState([]);
  const [orderFilter, setOrderFilter] = useState("");
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [customerDetailsModalShow, setCustomerDetailsModalShow] =
    useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  let orderFilterOptions = ["", "New", "Delivered", "Cancelled"];

  const options = orderFilterOptions.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const getRestaurantOrders = async () => {
    const response = await fetch("http://10.0.0.8:8080/getRestaurantOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantId: session.primaryID,
        orderStatus: orderFilter,
      }),
    });
    const data = await response.json();

    setRestaurantOrdersList(data);
  };
  const onChangeHandler = (event) => {
    setOrderFilter(event.target.value);
  };

  const onClickHandler = (Id, customerFlag) => {
    if (customerFlag) {
      setCustomerDetailsModalShow(true);
      getCustomerDetails(Id);
    } else {
      setDetailsModalShow(true);
      getOrderDetails(Id);
    }
  };

  const getOrderDetails = async (orderId) => {
    const response = await fetch(
      "http://10.0.0.8:8080/showRestaurantOrderDetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      }
    );
    const data = await response.json();
    setOrderDetails(data);
  };

  const getCustomerDetails = async (customerId) => {
    const response = await fetch("http://10.0.0.8:8080/showCustomerProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerId,
      }),
    });
    const data = await response.json();
    setCustomerDetails(data);
  };

  const formatTextForOrders = (date, quantity, price, deliveryAddress) => {
    let parseDate = new Date(date);
    return parseDate ? (
      <div>
        <p>{`${quantity} items for $${price} on ${parseDate.toLocaleString(
          "en-US",
          { timeZone: "PST" }
        )}`}</p>
        <p>{`Delivery Address : ${deliveryAddress}`}</p>
      </div>
    ) : (
      <div>
        <p>{`${quantity} items for $${price}`}</p>
        <p>{`Delivery Address : ${deliveryAddress}`}</p>
      </div>
    );
  };

  const displayOrders = () => {
    return restaurantOrdersList?.length > 0 ? (
      restaurantOrdersList.map((order) => {
        return (
          <Row>
            {" "}
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>
                    {order.orderStatus === "Order Received"
                      ? "New"
                      : order.orderStatus}
                  </h4>
                </Col>
                <Col>
                  <Button
                    variant="success"
                    // onClick={() => onClickHandler(order.orderId, false)}
                  >
                    Update Delivery status
                  </Button>
                </Col>
              </Row>
              <Col>
                {formatTextForOrders(
                  order.dateOrdered,
                  order.totalQuantity,
                  order.totalPrice,
                  order.deliveryAddress
                )}
              </Col>
              <Col>
                {" "}
                <Button
                  variant="light"
                  onClick={() => onClickHandler(order.orderId, false)}
                >
                  View Order Details
                </Button>
              </Col>
              <ReceiptModal
                receiptModalShow={detailsModalShow}
                onHide={() => setDetailsModalShow(false)}
                receiptDetails={orderDetails}
                header={"Details"}
              />
              <Col>
                {" "}
                <Button
                  variant="light"
                  onClick={() => onClickHandler(order.customerId, true)}
                >
                  View Customer Details
                </Button>
              </Col>
              <CustomerModal
                customerDetailsModalShow={customerDetailsModalShow}
                onHide={() => setCustomerDetailsModalShow(false)}
                customerDetails={customerDetails}
              />
            </ListGroup.Item>
          </Row>
        );
      })
    ) : (
      <ListGroup.Item>
        <h5>No Orders Found !!</h5>
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    getRestaurantOrders();
  }, [orderFilter]);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>Orders</Col>
        <Col>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Order Filters</Form.Label>
              <Form.Control
                name="orderFilterSelected"
                placeholder="Order Filters"
                as="select"
                onChange={onChangeHandler}
              >
                {options}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <ListGroup>{displayOrders()}</ListGroup>
    </Container>
  );
};

export default RestaurantOrders;

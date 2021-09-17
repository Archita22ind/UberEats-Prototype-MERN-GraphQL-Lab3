import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddDishModal from "./addDishModal.js";

const RestaurantDetails = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container fluid className="my-3">
      <Row>
          <Col xs={12} md={6}> </Col>
        <Col className="mt-3" xs={4} md={6}>
          <Button variant="dark" onClick={() => setModalShow(true)}>
            <font size="2"> Add Dishes</font>
          </Button>
          <AddDishModal show={modalShow} onHide={() => setModalShow(false)} />
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantDetails;

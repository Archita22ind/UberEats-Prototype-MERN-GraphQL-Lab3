import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Modal, Button } from "react-bootstrap";

const CustomerOrders = (props) => {
  const onChangeHandler = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    // props.setRenderedList((prevState) => {
    //   let newListOfDishes = [...prevState];
    //   newListOfDishes[props.keyValue] = {
    //     ...newListOfDishes[props.keyValue],
    //     [event.target.name]: event.target.value,
    //   };
    //   return newListOfDishes;
    // });
  };

  //   const submitDishesHandler = async (event) => {
  //     event.preventDefault();

  //     const formData = new FormData();
  //     formData.append("restaurantId", 1);
  //     formData.append("foodId", props.dishItem.foodId);
  //     formData.append("file", props.dishItem.image);
  //     formData.append("dishName", props.dishItem.dishName);
  //     formData.append("price", props.dishItem.price);
  //     formData.append("description", props.dishItem.description);
  //     formData.append("mainIngredients", props.dishItem.mainIngredients);
  //     formData.append("dishType", props.dishItem.dishType);
  //     formData.append("dishCategory", props.dishItem.dishCategory);
  //     formData.append("cuisine", props.dishItem.cuisine);

  //     console.log("Printing formData", formData);

  //     try {
  //       const response = await fetch("http://10.0.0.8:8080/editFoodItems", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await response.json();
  //       // enter you logic when the fetch is successful
  //       console.log("Data", data);
  //       props.onHide();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Modal
      // autoFocus="true"
      aria-labelledby="contained-modal-title-vcenter"
      // backdrop="static"
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridDishName">
                  <Form.Label>Add Dish Name</Form.Label>
                  <Form.Control name="dishName" placeholder="Dish Name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" placeholder="$$" />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row className="mb-3">
              <Form.Group xs={12} md={12} controlId="formGridDishDescription">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control
                  name="description"
                  placeholder="Enter dish description"
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId="formGridMainIngredients">
                <Form.Control
                  name="mainIngredients"
                  placeholder="Enter main ingredients"
                />
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={6}></Col>
              <Col xs={6} md={6}></Col>
            </Row>
            <Row></Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="dark">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CustomerOrders;

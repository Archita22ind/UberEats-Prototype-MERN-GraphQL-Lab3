import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  Col,
  Modal,
  Button,
} from "react-bootstrap";


const AddDishModal = (props) => {

  const [addDishValues, setAddDishValues] = useState({});

  const onChangeHandler = (event) => {
    event.preventDefault();

    setAddDishValues((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });

  };

  const onImageChangeHandler = (event) => {
      
    if (event.target.files && event.target.files[0]) {
        setAddDishValues((prevState)=>{
            return  {
             ...prevState,
             "imagePreview": URL.createObjectURL(event.target.files[0]),
             [event.target.name]: event.target.files[0]
         }
         });
      }
  };

  const viewImageHandler = () => {
    if (addDishValues.imagePreview) {
      return (
        <Form.Control
          name="imagePreview"
          type="image"
          src={addDishValues.imagePreview}
        />
      );
    }
  };

  const addDishesHandler = async (event) => {
    event.preventDefault();


  };

  return (
    <Form onSubmit={addDishesHandler}>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Form>
              <Row className="mb-3">
                <Form.Group md={12} controlId="formGridDishName">
                  <Form.Label>Add Dishes</Form.Label>
                  <Form.Control
                    required
                    name="dishName"
                    placeholder="Enter dish name"
                    onChange={onChangeHandler}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Form.Group controlId="formGridImage" xs={12} md={12}>
                {/* <Form.Label>Profile Image</Form.Label> */}
                {viewImageHandler()}
                <Form.Control
                  name="image"
                  type="file"
                  accept="image/*"
                  placeholder="Upload Image"
                  onChange={onImageChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group xs={12} md={12} controlId="formGridDishDescription">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control
                  required
                  name="description"
                  placeholder="Enter dish description"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId="formGridMainIngredients">
                <Form.Control
                  required
                  name="mainIngredients"
                  placeholder="Enter main ingredients"
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group xs={12} md={12} controlId="formGridDishType">
                  {/* <Form.Label>Description</Form.Label> */}

                  <Form.Select
                    required
                    name="dishType"
                    onChange={onChangeHandler}
                  >
                    <option>Select dish type</option>
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={6} md={6}>
                <Form.Group xs={12} md={12} controlId="formGridCategoryType">
                  <Form.Select
                    required
                    name="dishCategory"
                    onChange={onChangeHandler}
                  >
                    <option>Select dish Category</option>
                    <option value="Salads">Salads</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Soups">Soups</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Deserts">Deserts</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group xs={12} md={12} controlId="formGridCuisine">
                <Form.Select required name="cuisine" onChange={onChangeHandler}>
                  <option>Select Cuisine</option>
                  <option value="India">India</option>
                  <option value="American">American</option>
                  <option value="Italian">Italian</option>
                  <option value="Ethopian">Ethopian</option>
                  <option value="Thai">Thai</option>
                  <option value="French">French</option>
                  <option value="Singaporean">Singaporean</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};
export default AddDishModal;

import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const RestaurantEditDetails = (props) => {
  const onChangeHandler = (event) => {
    event.preventDefault();

    props.setRestaurantDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onImageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      props.setProfilePicture((prevState) => {
        return {
          ...prevState,
          imagePreview: URL.createObjectURL(event.target.files[0]),
          [event.target.name]: event.target.files[0],
        };
      });
    }
  };

  const onSaveClickHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("about", props.restaurantDetails.about);
    formData.append("file", props.profilePicture.image);
    console.log("Printing formdata", formData);

    try {
      const response = await fetch(
        "http://10.0.0.8:8080/restaurantDetailsInfoUpdate",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    props.setIsFormReadOnly(true);
  };

  let addressString =
    props.restaurantDetails.address +
    "," +
    props.restaurantDetails.city +
    "," +
    props.restaurantDetails.state +
    "," +
    props.restaurantDetails.zipCode;

  console.log(addressString);

  return (
    <Form>
      <Row className="mt-1">
        <Form.Group as={Col} controlId="formGridRestaurantName">
          <font size="6">
            <Form.Control
              plaintext={props.isFormReadOnly}
              readOnly={props.isFormReadOnly}
              name="restaurantName"
              placeholder={
                props.restaurantDetails.restaurantName
                  ? props.restaurantDetails.restaurantName
                  : "Restaurant Name"
              }
              // onChange={onChangeHandler}
            />
          </font>
        </Form.Group>
      </Row>

      <Row>
        <font size="2">
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Control
              as="textarea"
              style={{ height: "50px" }}
              plaintext={props.isFormReadOnly}
              readOnly={props.isFormReadOnly}
              name="about"
              // type="text"
              placeholder={
                props.restaurantDetails.about
                  ? props.restaurantDetails.about
                  : "About"
              }
              onChange={onChangeHandler}
            />
          </Form.Group>
        </font>
      </Row>

      <font size="1">
        <Row>
          <Col md={2}>
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="address"
                type="text"
                placeholder={
                  props.restaurantDetails.address
                    ? props.restaurantDetails.address
                    : "Address"
                }
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="city"
                type="text"
                placeholder={
                  props.restaurantDetails.city
                    ? props.restaurantDetails.city
                    : "City"
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="state"
                type="text"
                placeholder={
                  props.restaurantDetails.state
                    ? props.restaurantDetails.state
                    : "State"
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmailId">
          <Form.Control
            plaintext={props.isFormReadOnly}
            readOnly={props.isFormReadOnly}
            name="emailId"
            placeholder={
              props.restaurantDetails.emailId
                ? props.restaurantDetails.emailId
                : "Email Id"
            }
          />
        </Form.Group>
      </font>
      <Row>
        <Col md={10}>
          <Form.Group controlId="formGridImage">
            <Form.Control
              name="image"
              hidden={props.isFormReadOnly}
              type="file"
              accept="image/*"
              onChange={onImageChangeHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button
            onClick={onSaveClickHandler}
            variant="dark"
            hidden={props.isFormReadOnly}
          >
            Save Profile
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RestaurantEditDetails;

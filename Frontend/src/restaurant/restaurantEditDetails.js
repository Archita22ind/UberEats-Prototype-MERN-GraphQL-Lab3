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
    formData.append("restaurantId", props.restaurantDetails.restaurantId);
    formData.append("address", props.restaurantDetails.address);
    formData.append("city", props.restaurantDetails.city);
    formData.append("sate", props.restaurantDetails.state);
    formData.append("emailId", props.restaurantDetails.emailId);
    formData.append("contactNumber", props.restaurantDetails.contactNumber);
    formData.append("zipCode", props.restaurantDetails.zipCode);
    formData.append("openTime", props.restaurantDetails.openTime);
    formData.append("closeTime", props.restaurantDetails.closeTime);
    formData.append("deliveryFlag", props.restaurantDetails.deliveryFlag);
    formData.append("pickupFlag", props.restaurantDetails.pickupFlag);

    try {
      const response = await fetch(
        "http://10.0.0.8:8080/restaurantDetailsInfoUpdate",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
    } catch (error) {
      console.log(error);
    }

    props.setIsFormReadOnly(true);
  };

  // let addressString =
  //   props.restaurantDetails.address +
  //   "," +
  //   props.restaurantDetails.city +
  //   "," +
  //   props.restaurantDetails.state +
  //   "," +
  //   props.restaurantDetails.zipCode;

  return (
    <Form>
      <Row className="mt-1">
        <Form.Group as={Col}>
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
              onChange={onChangeHandler}
            />
          </font>
        </Form.Group>
      </Row>

      <Row>
        <font size="2">
          <Form.Group as={Col}>
            <Form.Control
              as="textarea"
              style={{ height: "50px" }}
              // tdstyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
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
            <Form.Group as={Col}>
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
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group as={Col}>
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
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group as={Col}>
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="zipCode"
                type="text"
                placeholder={
                  props.restaurantDetails.zipCode
                    ? props.restaurantDetails.zipCode
                    : "zipCode"
                }
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>

          <Col xs="auto">
            <Form.Group as={Col}>
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
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col md={2}>
            <Form.Group className="mb-1">
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="emailId"
                placeholder={
                  props.restaurantDetails.emailId
                    ? props.restaurantDetails.emailId
                    : "Email Id"
                }
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={1}>
            <Form.Group className="mb-1">
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="contactNumber"
                placeholder={
                  props.restaurantDetails.contactNumber
                    ? props.restaurantDetails.contactNumber
                    : "Contact Number"
                }
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>
            {/* <Form.Group className="mb-1"> */}
            <Col>
              <Form.Label>Open Time:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="openTime"
                placeholder={
                  props.restaurantDetails.openTime
                    ? props.restaurantDetails.openTime
                    : "HH:MM"
                }
                onChange={onChangeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Close Time:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                plaintext={props.isFormReadOnly}
                readOnly={props.isFormReadOnly}
                name="closeTime"
                placeholder={
                  props.restaurantDetails.closeTime
                    ? props.restaurantDetails.closeTime
                    : "HH:MM"
                }
                onChange={onChangeHandler}
              />
            </Col>
          </Col>

          <Col>
            <Form.Label>Delivery Available</Form.Label>
          </Col>
          <Col>
            <Form.Select
              plaintext={props.isFormReadOnly}
              readOnly={props.isFormReadOnly}
              name="deliveryFlag"
              placeholder={
                props.restaurantDetails.deliveryFlag
                  ? props.restaurantDetails.deliveryFlag
                  : "Yes/No"
              }
              onChange={onChangeHandler}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>

          <Col>
            <Form.Label>Pickup Available: </Form.Label>
          </Col>
          <Col>
            <Form.Select
              size="sm"
              as="select"
              plaintext={props.isFormReadOnly}
              readOnly={props.isFormReadOnly}
              name="pickupFlag"
              placeholder={
                props.restaurantDetails.pickupFlag
                  ? props.restaurantDetails.pickupFlag
                  : "Yes/No"
              }
              onChange={onChangeHandler}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>

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
      </font>
    </Form>
  );
};

export default RestaurantEditDetails;

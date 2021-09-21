import { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Figure,
  Card,
  Container,
  Image,
} from "react-bootstrap";
import Background from "../images/customerProfile.jpeg";
import Holder from "../images/holder.png";

const ProfileInfo = (props) => {
  const [customerDetails, setCustomerDetails] = useState({});

  // console.log("Testing Archita's Claim", setCustomerDetails);
  console.log("Printing state", customerDetails);

  const onChangeHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setCustomerDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  // const onSubmitHandler = (event) =>{
  //     event.preventDefault();
  //     event.stopPropagation();
  //     console.log(customerDetails);
  // };

  const onImageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCustomerDetails((prevState) => {
        return {
          ...prevState,
          imagePreview: URL.createObjectURL(event.target.files[0]),
          [event.target.name]: event.target.files[0],
        };
      });
    }
  };

  const viewImageHandler = () => {
    if (customerDetails.imagePreview) {
      return (
        <Form.Control
          name="imagePreview"
          type="image"
          src={customerDetails.imagePreview}
        />
      );
    }
  };

  const updateProfileInfo = async (event) => {
    event.preventDefault();
    // event.stopPropagation();
    const formData = new FormData();
    formData.append("file", customerDetails.image);
    formData.append("email", customerDetails.email);
    try {
      const response = await fetch("http://10.0.0.8:8080/updateProfileInfo", {
        method: "POST",
        body: formData,
        // headers: { 'Content-Type': 'multipart/form-data' }
      });

      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerProfileInfo = async () => {
    console.log("archita is called");
    const response = await fetch("http://10.0.0.8:8080/apiImage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset= UTF-8",
        Accept: "application/json, text/html, image/png",
      },
    });

    const data = await response.json();
    setCustomerDetails((prevState) => {
      return {
        ...prevState,
        imagePreview: "http://10.0.0.8:8080/" + data.image,
      };
    });
  };

  useEffect(() => {
    getCustomerProfileInfo(); //3rd party effects
  }, []);

  return (
    <Container
      fluid
      className="mt-5"
      style={{ backgroundImage: `url(${Background}` }}
    >
      <Row>
        <Form onSubmit={updateProfileInfo}>
          <Col xs={12} md={4}>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="holder.png/171x180"
              />
              <Figure.Caption>
                Nulla vitae elit libero, a pharetra augue mollis interdum.
              </Figure.Caption>
            </Figure>
          </Col>
          <Col xs={12} md={4}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridImage" xs={12} md={9}>
                <Form.Label>Profile Image</Form.Label>
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
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="customerName"
                  placeholder="Enter name"
                  value={customerDetails.customerName}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={customerDetails.email}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address1"
                placeholder="1234 Main St"
                value={customerDetails.address1}
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                name="address2"
                placeholder="Apartment, studio, or floor"
                value={customerDetails.address2}
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  placeholder="City"
                  value={customerDetails.city}
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  placeholder="Apartment, studio, or floor"
                  value={customerDetails.state}
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  name="country"
                  value={customerDetails.country}
                  onChange={onChangeHandler}
                >
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  name="zip"
                  value={customerDetails.zip}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default ProfileInfo;

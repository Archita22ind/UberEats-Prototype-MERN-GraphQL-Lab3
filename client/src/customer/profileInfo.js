import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Card, Container } from "react-bootstrap";
import Holder from "../images/holder.png";
import countryList from "react-select-country-list";

const ProfileInfo = (props) => {
  let countryArray = ["..."];
  countryArray.push(...countryList().getLabels());

  const options = countryArray.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const [customerDetails, setCustomerDetails] = useState({});

  const onChangeHandler = (event) => {
    event.preventDefault();

    setCustomerDetails((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

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
        <Card style={{ width: "21rem" }}>
          <Card.Img
            variant="top"
            src={customerDetails.imagePreview}
            height="200px"
          />
        </Card>
      );
    } else {
      return (
        <Card style={{ width: "16rem" }}>
          <Card.Img variant="top" src={Holder} height="200px" />
        </Card>
      );
    }
  };

  const updateProfileInfo = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", customerDetails.image);
    formData.append("lastName", customerDetails.lastName);
    formData.append("firstName", customerDetails.firstName);
    formData.append("password", customerDetails.password);
    formData.append("address", customerDetails.address);
    formData.append("city", customerDetails.city);
    formData.append("state", customerDetails.state);
    formData.append("country", customerDetails.country);
    formData.append("nickname", customerDetails.nickname);
    formData.append("contactNumber", customerDetails.contactNumber);
    formData.append("emailId", customerDetails.emailId);
    formData.append("dateOfBirth", customerDetails.dateOfBirth);
    formData.append("about", customerDetails.about);

    try {
      const response = await fetch("http://10.0.0.8:8080/updateProfileInfo", {
        method: "POST",
        body: formData,
        // headers: { 'Content-Type': 'multipart/form-data' }
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerProfileInfo = async () => {
    const response = await fetch("http://10.0.0.8:8080/getProfileInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset= UTF-8",
        Accept: "application/json, text/html, image/png",
      },
    });

    const data = await response.json();

    setCustomerDetails((prevState) => {
      let customerImageObject;
      if (data.image) {
        customerImageObject = {
          imagePreview: "http://10.0.0.8:8080/" + data.image,
        };
      } else {
        customerImageObject = {
          imagePreview: { Holder },
        };
      }

      return {
        ...prevState,
        ...customerImageObject,
        lastName: data.lastName,
        firstName: data.firstName,
        password: data.password,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        nickname: data.nickname,
        contactNumber: data.contactNumber,
        emailId: data.emailId,
        dateOfBirth: data.dateOfBirth,
        about: data.about,
      };
    });
  };

  useEffect(() => {
    getCustomerProfileInfo();
  }, []);

  return (
    <Container fluid className="mt-5" style={{ backgroundColor: "grey" }}>
      <h1>Customer Profile</h1>
      <Form onSubmit={updateProfileInfo}>
        <Row>
          <Col md={1}></Col>
          <Col xs={12} md={4} fluid className="mt-5">
            <Form.Group as={Col} controlId="formGridImage" xs={12} md={9}>
              <Card style={{ width: " 21rem" }}>
                {viewImageHandler()}
                <Form.Control
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={onImageChangeHandler}
                />
                <Form.Label>Profile Image</Form.Label>
              </Card>
            </Form.Group>

            <Form.Group as={Col} className="mt=3" controlId="formGridAbout">
              <Form.Label>About</Form.Label>
              <Form.Control
                style={{ height: "80px", width: " 340px" }}
                name="about"
                value={customerDetails.about}
                placeholder="About me...."
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={5} fluid className="mt-5">
            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  placeholder="First Name"
                  value={customerDetails.firstName}
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  placeholder="Last Name"
                  value={customerDetails.lastName}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridEmailId">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="emailId"
                  type="email"
                  placeholder="Enter email"
                  value={customerDetails.emailId}
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridContactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  name="contactNumber"
                  placeholder="+1()"
                  value={customerDetails.contactNumber}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>
            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridNickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  name="nickname"
                  placeholder="Nickname"
                  value={customerDetails.nickname}
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGriddob">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  name="dateOfbirth"
                  type="date"
                  value={customerDetails.dateOfbirth}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-1" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                placeholder="1234 Main St"
                value={customerDetails.address}
                onChange={onChangeHandler}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                name="address2"
                placeholder="Apartment, studio, or floor"
                value={customerDetails.address2}
                onChange={onChangeHandler}
              />
            </Form.Group> */}

            <Row className="mb-1">
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

              <Form.Group required as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="country"
                  as="select"
                  onChange={onChangeHandler}
                  value={customerDetails.country}
                >
                  ...
                  {options}
                </Form.Control>
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

            <Button variant="dark" type="submit">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProfileInfo;

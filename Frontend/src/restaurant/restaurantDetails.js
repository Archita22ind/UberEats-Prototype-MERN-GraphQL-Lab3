import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import AddDishModal from "./addDishModal.js";
import CustomerOrders from "./customerOrders";
import EditDishModal from "./editDishModal.js";
import Holder from "../images/holder.png";
import RestaurantEditDetails from "./restaurantEditDetails.js";
import { BsPencilSquare } from "react-icons/bs";

const RestaurantDetails = (props) => {
  let imageUrl = Holder;

  const [modalShow, setModalShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [isFormReadOnly, setIsFormReadOnly] = useState(true);
  const [renderedList, setRenderedList] = useState([]);

  if (profilePicture.imagePreview) {
    imageUrl = profilePicture.imagePreview;
  }

  // console.log(
  //   "3 printing state variable after updated on edit modal",
  //   renderedList
  // );

  const getRestaurantProfileInfo = async () => {
    const response = await fetch("http://10.0.0.8:8080/restaurantDetailsInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset= UTF-8",
        Accept: "application/json, text/html, image/png",
      },
    });

    const data = await response.json();

    setRestaurantDetails((prevState) => {
      return {
        ...prevState,
        restaurantName: data.restaurantName,
        address: data.address,
        about: data.about,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
      };
    });

    if (data.image) {
      setProfilePicture((prevState) => {
        return {
          ...prevState,
          imagePreview: "http://10.0.0.8:8080/" + data.image,
        };
      });
    }
  };

  const getDishesHandler = async (event) => {
    const response = await fetch("http://10.0.0.8:8080/foodItemsDisplay", {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset= UTF-8",
        Accept: "application/json, text/html, image/png",
      },
    });

    const data = await response.json();
    console.log("resposne data", data);

    setRenderedList(
      data.map((dataRow) => {
        return {
          ...dataRow,
          imagePreview: "http://10.0.0.8:8080/" + dataRow.image,
          show: false,
        };
      })
    );
  };

  const showEditHandler = (key, showFlag) => {
    console.log("Ohh nooo I am in edit button handler");
    setRenderedList((prevSate) => {
      const newarry = [...prevSate];
      newarry[key].show = showFlag;
      return newarry;
    });

    if (!showFlag) {
      console.log("*******Am I called???");
      getDishesHandler();
    }
  };

  const showOrderHandler = (showordersFlag) => {
    return (
      <Modal show={showordersFlag}>
        <Modal.Body>helloa</Modal.Body>
      </Modal>
    );
  };

  const displayList = () => {
    return (
      <Row>
        {renderedList.map((item, key) => {
          return (
            <Col xs={12} md={3} className="my-2">
              <Card>
                <Card.Img variant="top" src={item.imagePreview} />
                <Card.Header>{item.dishName}</Card.Header>
                <Card.Body style={{ height: "80px" }}>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>{item.price}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <BsPencilSquare
                    onClick={() => showEditHandler(key, true)}
                  ></BsPencilSquare>
                  <EditDishModal
                    onHide={() => showEditHandler(key, false)}
                    keyValue={key}
                    dishItem={item}
                    setRenderedList={setRenderedList}
                  />
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  useEffect(() => {
    getDishesHandler(); //3rd party effects
  }, []);

  useEffect(() => {
    getRestaurantProfileInfo();
    //console.log("I ran faster than API method"); //3rd party effects
  }, []);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Form
        // onSubmit={submitProfileImageHandler}
        >
          <Row>
            <Col>
              {/* <Form.Control src={profilePicture.imagePreview } name ="imagePreview" type="image" width="1000" height="250" /> */}
              <Card>
                <Card.Img variant="top" src={imageUrl} height="300px" />

                <Card.Body>
                  <Row>
                    <Col md={11}>
                      <RestaurantEditDetails
                        isFormReadOnly={isFormReadOnly}
                        setIsFormReadOnly={setIsFormReadOnly}
                        restaurantDetails={restaurantDetails}
                        setRestaurantDetails={setRestaurantDetails}
                        profilePicture={profilePicture}
                        setProfilePicture={setProfilePicture}
                      />
                    </Col>
                    <Col>
                      <Button
                        onClick={(event) => setIsFormReadOnly(false)}
                        variant="dark"
                      >
                        Edit
                        <BsPencilSquare />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>

                <Row>
                  <Col md={9}></Col>
                  <Col>
                    <Button
                      variant="dark"
                      onClick={() => showOrderHandler(true)}
                    >
                      Orders
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="dark" onClick={() => setModalShow(true)}>
                      Add Dishes
                    </Button>
                    <AddDishModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      getDishesHandler={getDishesHandler}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Row>
      {displayList()}
    </Container>
  );
};

export default RestaurantDetails;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import AddDishModal from "./addDishModal.js";
import EditDishModal from "./editDishModal.js";
import OrderModal from "../customer/orderModal.js";
import Holder from "../images/holder.png";
import RestaurantEditDetails from "./restaurantEditDetails.js";
import { BsPencilSquare } from "react-icons/bs";
import { getSessionCookie } from "../common/session";
import { useDispatch, useSelector } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants";
import { useHistory } from "react-router-dom";
import * as Cookies from "js-cookie";
import { alertActions } from "../actions/alertActions";
import { useLocation } from "react-router-dom";

const RestaurantDetails = (props) => {
  let imageUrl = Holder;

  const dispatch = useDispatch();
  const history = useHistory();

  const [modalShow, setModalShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [isFormReadOnly, setIsFormReadOnly] = useState(true);
  const [renderedList, setRenderedList] = useState([]);
  // const [showOrderModal, setshowOrderModal] = useState(false);
  const location = useLocation();
  const session = getSessionCookie();
  const user = useSelector((state) => state.authentication.user);

  let restaurantId;

  if (session.restaurantFlag) {
    restaurantId = session.primaryID;
  } else {
    window.sessionStorage.setItem("restaurantId", location.state?.restaurantId);
    restaurantId = window.sessionStorage.getItem("restaurantId");
  }

  if (profilePicture.imagePreview) {
    imageUrl = profilePicture.imagePreview;
  }

  const getRestaurantProfileInfo = async () => {
    const response = await fetch(
      `http://10.0.0.8:8080/restaurantDetailsInfo?restaurantId=${restaurantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json, charset= UTF-8",
          Accept: "application/json, text/html, image/png",
        },
      }
    );

    const data = await response.json();

    setRestaurantDetails((prevState) => {
      return {
        ...prevState,
        restaurantId: data.restaurantId,
        restaurantName: data.restaurantName,
        address: data.address,
        about: data.about,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        openTime: data.openTime,
        closeTime: data.closeTime,
        deliveryFlag: data.deliveryFlag,
        pickupFlag: data.pickupFlag,
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
    const response = await fetch(
      `http://10.0.0.8:8080/foodItemsDisplay?restaurantId=${restaurantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json, charset= UTF-8",
          Accept: "application/json, text/html, image/png",
        },
      }
    );

    const data = await response.json();

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
    setRenderedList((prevState) => {
      const newarry = [...prevState];
      newarry[key].show = showFlag;
      return newarry;
    });

    if (session.restaurantFlag) {
      if (!showFlag) {
        getDishesHandler();
      }
    }
  };

  const renderModal = (key, item) => {
    if (session.restaurantFlag) {
      return (
        <EditDishModal
          onHide={() => showEditHandler(key, false)}
          keyValue={key}
          dishItem={item}
          setRenderedList={setRenderedList}
        />
      );
    } else {
      return (
        <OrderModal
          onHide={() => showEditHandler(key, false)}
          keyValue={key}
          dishItem={item}
          customerId={session.primaryID}
        />
      );
    }
  };

  const displayList = () => {
    return (
      <Row>
        {renderedList.map((item, key) => {
          return (
            <Col xs={12} md={3} className="my-2">
              <Button
                variant="light"
                onClick={() => showEditHandler(key, true)}
              >
                <Card>
                  <Card.Img variant="top" src={item.imagePreview} />
                  <Card.Header>{item.dishName}</Card.Header>
                  <Card.Body style={{ height: "80px" }}>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Button>
              {renderModal(key, item)}
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
  }, []);

  const showEditbutton = () => {
    if (session.restaurantFlag)
      return (
        <Col>
          <Button onClick={(event) => setIsFormReadOnly(false)} variant="dark">
            Edit
            <BsPencilSquare />
          </Button>
        </Col>
      );
  };
  const addDishButton = () => {
    if (session.restaurantFlag)
      return (
        <Row>
          <Col md={9}></Col>
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
      );
  };

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
                    {showEditbutton()}
                  </Row>
                </Card.Body>

                {addDishButton()}
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

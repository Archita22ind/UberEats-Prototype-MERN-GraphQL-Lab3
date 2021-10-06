import { Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Holder from "../images/holder.png";
import { getSessionCookie } from "../common/session";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const RestaurantList = (props) => {
  const history = useHistory();
  const session = getSessionCookie();
  const viewImageHandler = (restaurant) => {
    if (restaurant.imagePreview) {
      return (
        <Card style={{ width: "12rem" }}>
          <Card.Img
            variant="top"
            src={restaurant.imagePreview}
            height="200px"
          />
        </Card>
      );
    } else {
      return (
        <Card style={{ width: "15rem" }}>
          <Card.Img variant="top" src={Holder} height="200px" />
        </Card>
      );
    }
  };

  const createFavouritesList = async (restaurantId) => {
    try {
      const response = await fetch(
        "http://10.0.0.8:8080/createFavouritesList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: session.primaryID,
            restaurantId: restaurantId,
          }),
        }
      );
      const data = await response.json();

      if (props.fetchFilteredRestaurants) {
        props.fetchFilteredRestaurants();
      } else if (props.getFavoriteRestaurants) {
        props.getFavoriteRestaurants();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const linkToRestaurantPage = (restaurantId) => {
    console.log("aahaha", restaurantId);
    window.sessionStorage.setItem("restaurantId", restaurantId);
    history.push("/restaurantDetails");
  };

  return (
    <Row>
      {props.restaurantList.map((restaurant, key) => {
        console.log("inside list map", key, restaurant);
        return (
          <Col xs={12} md={3} className="mb-4">
            <Card>
              <Button
                variant="light"
                onClick={(e) => linkToRestaurantPage(restaurant.RestaurantID)}
              >
                {viewImageHandler(restaurant)}
                <Card.Header>{restaurant.RestaurantName}</Card.Header>
              </Button>
              <font size="2">
                <Card.Footer>
                  {restaurant.City}, {restaurant.State} {"                  "}
                  {restaurant.isLiked ? (
                    <FcLike
                      type="button"
                      onClick={(e) =>
                        createFavouritesList(restaurant.RestaurantID)
                      }
                    />
                  ) : (
                    <FcLikePlaceholder
                      type="button"
                      onClick={(e) =>
                        createFavouritesList(restaurant.RestaurantID)
                      }
                    />
                  )}
                </Card.Footer>
              </font>
            </Card>
          </Col>
        );
      })}{" "}
    </Row>
  );
};

export default RestaurantList;

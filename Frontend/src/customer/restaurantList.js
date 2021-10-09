import { Row, Col, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Holder from "../images/holder.png";
import { getSessionCookie } from "../common/session";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const RestaurantList = (props) => {
  const history = useHistory();
  const session = getSessionCookie();
  const viewImageHandler = (restaurant) => {
    if (restaurant.imagePreview) {
      return (
        <Card.Img
          variant="top"
          src={restaurant.imagePreview}
          height="150px"
        />
      );
    } else {
      return (
        <Card style={{ width: "15rem" }}>
          <Card.Img variant="top" src={Holder} height="200px" />
        </Card>
      );
    }
  };

  const onClickHandler = (restaurantId) => {
    window.sessionStorage.setItem("restaurantId", restaurantId);
    history.push("/restaurantDetails");
  }

  const createFavouritesList = async (restaurantId) => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/createFavouritesList`,
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

  return (
    <Row>
      {props.restaurantList.map((restaurant, key) => {
        return (
          <Col xs={12} md={3} className="mb-4">
            <Card>
            <Card.Body style = {{cursor: 'pointer'}} onClick={() => onClickHandler(restaurant.RestaurantID)}>
            {viewImageHandler(restaurant)}
                <Card.Text style={{ fontSize: 20 }}>
                  {restaurant.RestaurantName}
                </Card.Text>
              </Card.Body>
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

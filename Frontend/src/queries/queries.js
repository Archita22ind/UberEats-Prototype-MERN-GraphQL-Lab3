import { gql } from "apollo-boost";

// login queries
const UserLoginQuery = gql`
  query UserLoginQuery($email: String, $password: String) {
    loginCustomer(email: $email, password: $password) {
      successFlag
      customerID
    }
  }
`;

const RestaurantLoginQuery = gql`
  query RestaurantLoginQuery($email: String, $password: String) {
    loginRestaurant(email: $email, password: $password) {
      successFlag
      restaurantId
    }
  }
`;

export { UserLoginQuery, RestaurantLoginQuery };

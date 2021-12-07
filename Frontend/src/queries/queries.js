import { gql } from "apollo-boost";

// login queries
const UserLoginQuery = gql`
  query UserLoginQuery($emailId: String, $password: String) {
    loginCustomer(emailId: $emailId, password: $password) {
      successFlag
      customerId
    }
  }
`;

const RestaurantLoginQuery = gql`
  query RestaurantLoginQuery($emailId: String, $password: String) {
    loginRestaurant(emailId: $emailId, password: $password) {
      successFlag
      restaurantId
    }
  }
`;

//get customerProfile info

const GetCustomerQuery = gql`
  query GetCustomerQuery($customerId: Int) {
    getCustomer(customerId: $customerId) {
      customerId
      lastName
      firstName
      emailId
      contactNumber
      nickname
      dateOfBirth
      city
      state
      country
      addressLine1
      addressLine2
      about
      image
      zipcode
    }
  }
`;

//get restaurant Info details

const GetRestaurantDetailsQuery = gql`
  query GetRestaurantDetailsQuery($restaurantId: Int) {
    getRestaurantDetails(restaurantId: $restaurantId) {
      restaurantId
      restaurantName
      address
      about
      city
      state
      zipcode
      country
      contactNumber
      emailId
      image
      openTime
      closeTime
      deliveryFlag
      pickupFlag
    }
  }
`;

//get receipt details

const GetReceiptDetailsQuery = gql`
  query GetReceiptDetailsQuery($orderId: Int) {
    getReceiptDetails(orderId: $orderId) {
      foodName
      price
      quantity
    }
  }
`;

//get past orders

const GetPastOrdersQuery = gql`
  query GetPastOrdersQuery($customerId: Int, $orderStatus: String) {
    getPastOrders(customerId: $customerId, orderStatus: $orderStatus) {
      restaurantName
      orderId
      totalPrice
      dateOrdered
      totalItems
      orderStatus
    }
  }
`;

//get customer Location

const GetCustomerLocationQuery = gql`
  query GetCustomerLocationQuery($customerId: Int) {
    getCustomerLocation(customerId: $customerId) {
      city
    }
  }
`;

const GetDeliveryAddressQuery = gql`
  query GetDeliveryAddressQuery($customerId: Int) {
    getDeliveryAddress(customerId: $customerId) {
      addressLine1
      addressLine2
      city
    }
  }
`;

const GetDeliveryTypeQuery = gql`
  query GetDeliveryTypeQuery($customerId: Int) {
    getDeliveryType(customerId: $customerId) {
      orderId
      deliveryType
    }
  }
`;

const GetCartDetailsQuery = gql`
  query GetCartDetailsQuery($customerId: Int) {
    getCartDetails(customerId: $customerId) {
      orderDetailsId
      orderId
      restaurantId
      customerId
      foodId
      foodName
      price
      quantity
      amount
      restaurantName
    }
  }
`;

const GetOrderTotalQuery = gql`
  query GetOrderTotalQuery($customerId: Int) {
    getOrderTotal(customerId: $customerId) {
      totalPrice
      totalItems
    }
  }
`;

export {
  UserLoginQuery,
  RestaurantLoginQuery,
  GetCustomerQuery,
  GetReceiptDetailsQuery,
  GetPastOrdersQuery,
  GetCustomerLocationQuery,
  GetRestaurantDetailsQuery,
  GetDeliveryAddressQuery,
  GetDeliveryTypeQuery,
  GetCartDetailsQuery,
  GetOrderTotalQuery,
};

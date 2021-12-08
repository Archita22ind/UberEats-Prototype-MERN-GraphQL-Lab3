import { gql } from "apollo-boost";

// customer login query
const UserLoginQuery = gql`
  query UserLoginQuery($emailId: String, $password: String) {
    loginCustomer(emailId: $emailId, password: $password) {
      successFlag
      customerId
    }
  }
`;

// restaurant login
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

// get list of restaurants based on typeahead filters
const GetRestaurantsListQuery = gql`
  query GetRestaurantsListQuery(
    $customerId: Int
    $deliveryType: String
    $typeaheadValue: String
    $filter: String
  ) {
    getRestaurantsList(
      customerId: $customerId
      deliveryType: $deliveryType
      typeaheadValue: $typeaheadValue
      filter: $filter
    ) {
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
      totalQuantity
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

//get delivery address of customer
const GetDeliveryAddressQuery = gql`
  query GetDeliveryAddressQuery($customerId: Int) {
    getDeliveryAddress(customerId: $customerId) {
      addressLine1
      addressLine2
      city
    }
  }
`;

//get food items of a restaurant
const GetFoodItemsQuery = gql`
  query GetFoodItemsQuery($restaurantId: Int) {
    getFoodItems(restaurantId: $restaurantId) {
      foodId
      restaurantId
      dishName
      price
      description
      dishType
      dishCategory
      mainIngredients
      cuisine
      image
      restaurantName
    }
  }
`;

//get delievry type
const GetDeliveryTypeQuery = gql`
  query GetDeliveryTypeQuery($customerId: Int) {
    getDeliveryType(customerId: $customerId) {
      orderId
      deliveryType
    }
  }
`;

//get list of restaurant's orders
const GetRestaurantOrdersQuery = gql`
  query GetRestaurantOrdersQuery($restaurantId: Int, $orderStatus: String) {
    getRestaurantOrders(
      restaurantId: $restaurantId
      orderStatus: $orderStatus
    ) {
      orderId
      totalPrice
      totalQuantity
      deliveryAddress
      dateOrdered
      orderStatus
      customerId
      deliveryType
    }
  }
`;

// get details of the cart
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
//get order total
const GetOrderTotalQuery = gql`
  query GetOrderTotalQuery($customerId: Int) {
    getOrderTotal(customerId: $customerId) {
      totalPrice
      totalQuantity
    }
  }
`;

export {
  UserLoginQuery,
  RestaurantLoginQuery,
  GetCustomerQuery,
  GetReceiptDetailsQuery,
  GetRestaurantsListQuery,
  GetPastOrdersQuery,
  GetCustomerLocationQuery,
  GetRestaurantDetailsQuery,
  GetDeliveryAddressQuery,
  GetDeliveryTypeQuery,
  GetFoodItemsQuery,
  GetRestaurantOrdersQuery,
  GetCartDetailsQuery,
  GetOrderTotalQuery,
};

import { gql } from "apollo-boost";

// restaurant sign up mutation
const AddRestaurantMutation = gql`
  mutation (
    $restaurantName: String
    $address: String
    $password: String
    $city: String
    $country: String
    $state: String
    $zipcode: Int
    $contactNumber: String
    $emailId: String
  ) {
    createRestaurant(
      restaurantName: $restaurantName
      address: $address
      password: $password
      country: $country
      city: $city
      state: $state
      zipcode: $zipcode
      contactNumber: $contactNumber
      emailId: $emailId
    ) {
      restaurantId
    }
  }
`;

// customer sign up mutation
const AddUserMutation = gql`
  mutation (
    $firstName: String
    $lastName: String
    $password: String
    $country: String
    $contactNumber: String
    $emailId: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      password: $password
      country: $country
      contactNumber: $contactNumber
      emailId: $emailId
    ) {
      customerId
    }
  }
`;

// update customer profile mutation
const UpdateCustomerMutation = gql`
  mutation UpdateCustomerMutation(
    $customerId: Int
    $lastName: String
    $firstName: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $country: String
    $zipCode: Int
    $nickname: String
    $contactNumber: String
    $emailId: String
    $dateOfBirth: String
    $about: String
    $profilePicture: String
  ) {
    updateCustomer(
      customerId: $customerId
      lastName: $lastName
      firstName: $firstName
      emailId: $emailId
      contactNumber: $contactNumber
      nickname: $nickname
      address1: $address1
      address2: $address2
      dateOfBirth: $dateOfBirth
      city: $city
      state: $state
      country: $country
      zipCode: $zipCode
      about: $about
      profilePicture: $profilePicture
    ) {
      customerId
    }
  }
`;

// update restaurant profile mutation
// const UpdateRestaurantMutation = gql`
//   mutation UpdateRestaurantMutation(
//     $restaurantName: String
//     $address: String
//     $password: String
//     $city: String
//     $country: String
//     $state: String
//     $zipcode: Int
//     $contactNumber: String
//     $emailId: String
//     $profilePicture: String
//     $about: String
//     $openTime: String
//     $closeTime: String
//     $deliveryFlag: String
//     $pickupFlag: String
//   ) {
//     updateRestaurant(
//       restaurantName: $restaurantName
//       address: $address
//       password: $password
//       country: $country
//       city: $city
//       state: $state
//       zipcode: $zipcode
//       contactNumber: $contactNumber
//       emailId: $emailId
//       profilePicture: $profilePicture
//       about: $about
//       openTime: $openTime
//       closeTime: $closeTime
//       deliveryFlag: $deliveryFlag
//       pickupFlag: $pickupFlag
//     ) {
//       restaurantId
//     }
//   }
// `;

//add new dishes in restaurant menu mutation
// const AddFoodDishesMutation = gql`
//   mutation AddFoodDishesMutation(
//     $restaurantId: Int
//     $foodName: String
//     $price: Float
//     $description: String
//     $foodType: String
//     $foodCategory: String
//     $mainIngredients: String
//     $cuisineType: String
//     $image: String
//   ) {
//     addFoodDishes(
//       restaurantId: $restaurantId
//       foodName: $foodName
//       price: $price
//       description: $description
//       foodType: $foodType
//       foodCategory: $foodCategory
//       mainIngredients: $mainIngredients
//       cuisineType: $cuisineType
//       image: $image
//     ) {
//       foodId
//     }
//   }
// `;

//edit/update  dishes in restaurant menu mutation
// const UpdateFoodDishesMutation = gql`
//   mutation UpdateFoodDishesMutation(
//     $restaurantId: Int
//     $foodName: String
//     $price: Float
//     $description: String
//     $foodType: String
//     $foodCategory: String
//     $mainIngredients: String
//     $cuisineType: String
//     $image: String
//   ) {
//     updateFoodDishes(
//       restaurantId: $restaurantId
//       foodName: $foodName
//       price: $price
//       description: $description
//       foodType: $foodType
//       foodCategory: $foodCategory
//       mainIngredients: $mainIngredients
//       cuisineType: $cuisineType
//       image: $image
//     ) {
//       foodId
//     }
//   }
// `;

//add order to cart mutation
// const AddOrderToCartMutation = gql`
//   mutation AddOrderToCartMutation(
//     $orderId: Int
//     $foodId: Int
//     $restaurantId: Int
//     $customerId: Int
//     $foodName: String
//     $dishPrice: Float
//     $quantity: Int
//   ) {
//     addOrderToCart(
//       orderId: $orderId
//       foodId: $foodId
//       restaurantId: $restaurantId
//       customerId: $customerId
//       foodName: $foodName
//       dishPrice: $dishPrice
//       quantity: $quantity
//     ) {
//       orderId
//     }
//   }
// `;

//Book order mustation
// const BookOrderMutation = gql`
//   mutation BookOrderMutation(
//     $customerId: Int
//     $totalPrice: Float
//     $totalQuantity: Int
//     $dateOrdered: String
//   ) {
//     bookOrder(
//       customerId: $customerId
//       totalPrice: $totalPrice
//       totalQuantity: $totalQuantity
//       dateOrdered: $dateOrdered
//     ) {
//       orderId
//     }
//   }
// `;

// // creation of new order after removing existing order from cart mutation
const CreateNewOrderMutation = gql`
  mutation CreateNewOrderMutation($orderId: Int) {
    createNewOrder(orderId: $orderId) {
      restaurantId
      foodId
      foodName
      customerId
      price
      quantity
    }
  }
`;

//update status of placed order mutation
const UpdateOrderStatusMutation = gql`
  mutation UpdateOrderStatusMutation($orderId: Int, $orderStatus: String) {
    updateOrderStatus(orderId: $orderId, orderStatus: $orderStatus) {
      orderId
      totalPrice
      totalQuantity
      deliveryAddress
      dateOrdered
      orderStatus
      customerId
      deliveryOrPickup
    }
  }
`;
export {
  AddUserMutation,
  UpdateCustomerMutation,
  AddRestaurantMutation,
  CreateNewOrderMutation,
  UpdateOrderStatusMutation,
};

// UpdateRestaurantMutation,
// AddFoodDishesMutation,
// UpdateFoodDishesMutation,
// AddOrderToCartMutation,
// BookOrderMutation,

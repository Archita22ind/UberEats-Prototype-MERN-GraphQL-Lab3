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
const UpdateRestaurantMutation = gql`
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
    $profilePicture: String
    $about: String
    $openTime: String
    $closeTime: String
    $deliveryFlag: String
    $pickupFlag: String
  ) {
    updateRestaurant(
      restaurantName: $restaurantName
      address: $address
      password: $password
      country: $country
      city: $city
      state: $state
      zipcode: $zipcode
      contactNumber: $contactNumber
      emailId: $emailId
      profilePicture: $profilePicture
      about: $about
      openTime: $openTime
      closeTime: $closeTime
      deliveryFlag: $deliveryFlag
      pickupFlag: $pickupFlag
    ) {
      restaurantId
    }
  }
`;

export {
  AddUserMutation,
  UpdateCustomerMutation,
  AddRestaurantMutation,
  UpdateRestaurantMutation,
};

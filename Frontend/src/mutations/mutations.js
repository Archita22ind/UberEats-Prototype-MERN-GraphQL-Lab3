import { gql } from "apollo-boost";

// user mutations
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
      customerID
    }
  }
`;

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
      customerID
    }
  }
`;

export { AddUserMutation, UpdateCustomerMutation };

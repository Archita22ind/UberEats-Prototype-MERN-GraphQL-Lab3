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

export { UserLoginQuery };

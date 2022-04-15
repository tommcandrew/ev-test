import gql from "graphql-tag";

const CREATE_CLIENT = gql`
  mutation CreateClient($name: String, $email: String, $company: String) {
    createClient(name: $name, email: $email, company: $company) {
      id
    }
  }
`;

export default CREATE_CLIENT;

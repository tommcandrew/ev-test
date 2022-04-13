import { gql } from "@apollo/client";

const CLIENTS = gql`
  query {
    clients {
      id
      name
      email
      company
      createdAt
    }
  }
`;

export default CLIENTS;

import gql from "graphql-tag";

const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID) {
    deleteClient(id: $id) {
      id
      name
    }
  }
`;

export default DELETE_CLIENT;

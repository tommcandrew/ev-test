import gql from "graphql-tag";

const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID) {
    deleteClient(id: $id)
  }
`;

export default DELETE_CLIENT;

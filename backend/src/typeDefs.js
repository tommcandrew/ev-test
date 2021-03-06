import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    clients: [Client]
  }
  type Mutation {
    createClient(name: String, email: String, company: String): Client
    deleteClient(id: ID): Client
  }
  type Client {
    id: ID
    name: String
    email: String
    company: String
    createdAt: String
  }
`;

export default typeDefs;

import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    clients: [Client]!
  }
  type Mutation {
    createClient(name: String!): Client!
  }
  type Client {
    id: ID!
    name: String!
    email: String
    company: String
    createdDate: Date
  }
`;

export default typeDefs;
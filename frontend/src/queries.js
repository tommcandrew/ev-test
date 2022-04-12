import {
    gql,
  } from '@apollo/client';

export const CLIENTS = gql`
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

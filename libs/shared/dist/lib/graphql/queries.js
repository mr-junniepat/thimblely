import { gql } from '@apollo/client';
// Example query - replace with your actual queries
export const GET_ITEMS = gql `
  query GetItems {
    items {
      id
      name
      description
      createdAt
    }
  }
`;
export const GET_ITEM = gql `
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      createdAt
    }
  }
`;

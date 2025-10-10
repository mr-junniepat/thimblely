import { gql } from '@apollo/client';
// Example mutation - replace with your actual mutations
export const CREATE_ITEM = gql `
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      description
      createdAt
    }
  }
`;
export const UPDATE_ITEM = gql `
  mutation UpdateItem($id: ID!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      name
      description
      createdAt
    }
  }
`;
export const DELETE_ITEM = gql `
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      success
      message
    }
  }
`;

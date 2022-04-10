import { gql } from '@apollo/client';

export const UPDATERESTAURANT = gql`
  mutation updateRest($id: ID!, $input: InputRestaurant) {
    updateRestaurant(id: $id, input: $input) {
      photo
      reviews {
        user {
          id
        }
        comments
      }
    }
  }
`;

export const NEWRESTAURANT = gql`
  mutation newRestaurant($input: InputRestaurant) {
    newRestaurant(input: $input) {
      id
    }
  }
`;

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

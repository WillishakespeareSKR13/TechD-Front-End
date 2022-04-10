import { gql } from '@apollo/client';

export const GETRESTAURANTS = gql`
  query getRestaurants {
    getRestaurants {
      id
      name
      neighborhood
      address
      photo
      cuisine_type
      operating_hours {
        Monday
      }
      reviews {
        user {
          id
        }
        rating
        date
        comments
      }
      company {
        id
        name
        email
        role
      }
      latlng {
        lat
        lng
      }
    }
  }
`;

export const GETRESTAURANTBYID = gql`
  query getRestaurantById($id: ID!) {
    getRestaurantById(id: $id) {
      id
      name
      neighborhood
      address
      photo
      cuisine_type
      operating_hours {
        Monday
      }
      reviews {
        user {
          id
          name
          email
          role
          photo
        }
        rating
        date
        comments
      }
      company {
        id
        name
        email
        role
      }
      latlng {
        lat
        lng
      }
    }
  }
`;

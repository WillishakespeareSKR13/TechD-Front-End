import { gql } from '@apollo/client';

export const ME = gql`
  query me {
    me {
      id
      name
      email
      password
      role
      photo
    }
  }
`;

export const GETUSERS = gql`
  query getUsers($filter: FilterUser) {
    getUsers(filter: $filter) {
      id
      name
      email
      password
      role
      photo
    }
  }
`;

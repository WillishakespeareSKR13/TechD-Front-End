import { gql } from '@apollo/client';

export const NEWUSER = gql`
  mutation newUser($input: InputUser) {
    newUser(input: $input) {
      id
      name
      email
      password
      role
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: InputLogin) {
    login(input: $input) {
      token
    }
  }
`;

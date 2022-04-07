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

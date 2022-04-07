import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  #######################TYPES#######################

  type User {
    id: ID
    name: String
    email: String
    password: String
    role: String
  }

  type TokenUser {
    token: String
  }

  #######################INPUT#######################

  input InputUser {
    name: String
    email: String
    password: String
    role: String
  }

  input FilterUser {
    id: ID
    name: String
    email: String
    password: String
    role: String
  }

  input InputLogin {
    email: String!
    password: String!
  }

  #######################QUERY#######################
  extend type Query {
    me: User
    getUsers(filter: FilterUser): [User]
    getUserById(id: ID!): User
  }
  #####################MUTACION######################
  extend type Mutation {
    newUser(input: InputUser): User
    updateUser(id: ID!, input: InputUser): User
    login(input: InputLogin): TokenUser
  }
`;

export default typeDefs;

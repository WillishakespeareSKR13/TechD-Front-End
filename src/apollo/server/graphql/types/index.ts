import { gql } from 'apollo-server-micro';
import User from './_User';
import Restaurants from './_Restaurant';

const typeDefs = gql`
  ${User}
  ${Restaurants}

  type Query {
    ping: String
  }
  type Mutation {
    pong: String
  }
`;

export default typeDefs;

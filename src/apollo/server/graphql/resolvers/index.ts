import { Resolvers } from '@apollo/client';
import User from './_User';
import Restaurants from './_Restaurant';

const resolvers: Resolvers = {
  Query: {
    ...User.Query,
    ...Restaurants.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Restaurants.Mutation,
  },
};

export default resolvers;

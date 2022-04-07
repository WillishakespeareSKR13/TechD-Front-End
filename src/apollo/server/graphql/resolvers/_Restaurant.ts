import { Resolvers } from '@apollo/client';
import Restaurants from '../../models/restaurants';
import User from '../../models/users';

const resolvers: Resolvers = {
  Query: {
    getRestaurants: async (_, { filter }) =>
      await Restaurants.find({
        ...filter,
      })
        .populate('company')
        .populate('reviews.user'),
    getRestaurantById: async (_, { id }) => {
      return await Restaurants.findById(id);
    },
  },
  Mutation: {
    newRestaurant: async (_, { input }) => {
      const { company } = input;

      const isCompany = await User.findById(company);
      if (!isCompany) throw new Error('Company not found');
      if (isCompany.role !== 'company')
        throw new Error('This is not a company');

      const newRestaurant = await Restaurants.create({
        ...input,
        company: isCompany.id,
      });

      return newRestaurant;
    },

    updateRestaurant: async (_, { id, input }) => {
      const restaurant = await Restaurants.findByIdAndUpdate(id, input, {
        new: true,
      });

      const getRestaurant = await Restaurants.findById(restaurant.id)
        .populate('company')
        .populate('reviews.user');

      return getRestaurant;
    },

    deleteRestaurant: async (_, { id }) => {
      const restaurant = await Restaurants.findByIdAndDelete(id);

      return restaurant;
    },
  },
};

export default resolvers;

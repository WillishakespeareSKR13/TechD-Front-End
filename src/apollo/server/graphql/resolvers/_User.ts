import { Resolvers } from '@apollo/client';
import bcryptjs from 'bcryptjs';
import Users from '../../models/users';
import createToken from '../utils/createToken';

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, ctx) => {
      if (!ctx.user) {
        throw new Error('You are not logged in');
      }
      return ctx.user;
    },
    getUsers: async (_, { filter }) =>
      await Users.find({
        ...filter,
      }),
    getUserById: async (_, { id }) => {
      return await Users.findById(id);
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      const userExist = await Users.findOne({ email });
      if (userExist) throw new Error('User already exist');

      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await Users.create({
        ...input,
        password: hashedPassword,
      });
      const getUser = await Users.findById(user.id);

      return getUser;
    },

    login: async (_, { input }) => {
      const { email, password } = input;

      const userExist = await Users.findOne({ email });

      if (!userExist) throw new Error('User does not exist');

      const isMatch = await bcryptjs.compare(password, userExist.password);
      if (!isMatch) throw new Error('Password does not match');

      const token = createToken(userExist, 'LEGOSECRET', '24h');

      return { token };
    },

    updateUser: async (_, { id, input }) => {
      const { password } = input;

      const userExist = await Users.findById(id);

      if (!userExist) throw new Error('User does not exist');

      const passwordExist = async () => {
        if (!password) {
          return userExist.password;
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        return hashedPassword;
      };

      const hashedPassword = await passwordExist();

      const user = await Users.findByIdAndUpdate(
        id,
        {
          ...input,
          password: hashedPassword,
        },
        { new: true }
      );

      const getUser = await Users.findById(user.id);

      return getUser;
    },
  },
};

export default resolvers;

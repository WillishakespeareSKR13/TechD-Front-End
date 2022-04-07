import { IUser } from '@ApolloServer/models/users';
import jwt from 'jsonwebtoken';

const createToken = (user: IUser, secret: string, expiresIn: string) => {
  const { id, name, email, role } = user;
  return jwt.sign(
    {
      id,
      name,
      email,
      role,
    },
    secret,
    { expiresIn }
  );
};

export default createToken;

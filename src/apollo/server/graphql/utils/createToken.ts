import { IUser } from '@ApolloServer/models/users';
import jwt from 'jsonwebtoken';

const createToken = (user: IUser, secret: string, expiresIn: string) => {
  const { id, name, email, role, photo } = user;
  return jwt.sign(
    {
      id,
      name,
      email,
      role,
      photo,
    },
    secret,
    { expiresIn }
  );
};

export default createToken;

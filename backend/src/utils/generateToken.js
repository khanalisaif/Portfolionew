import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

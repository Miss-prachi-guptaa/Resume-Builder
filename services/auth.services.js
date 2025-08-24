import argon2 from "argon2";

import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  // return await bcrypt.hash(password, 10);
  return await argon2.hash(password);
}

export const comparePassword = async (hashPassword, password) => {
  // return await bycpt.compare(hashPassword, password);
  return await argon2.verify(hashPassword, password);
}

export const generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  )
};
// verufy JWT token
export const verifyJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
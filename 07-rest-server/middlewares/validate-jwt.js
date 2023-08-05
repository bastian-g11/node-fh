import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.json({ msg: 'Missing token in the request' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    if (!user.isActive) {
      return res
        .status(401)
        .json({ msg: 'Not valid token, user is not active' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Not valid Token',
    });
  }
};

export { validateJWT };

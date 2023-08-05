import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import { generateJWT } from '../helpers/generate-jwt.js';

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Email or Password incorrect' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({ msg: 'User inactive' });
    }

    // Check password
    const isValidPassword = bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ msg: 'Email or Password incorrect' });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export { login };

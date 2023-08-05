import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';

const getAllUsers = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { isActive: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({ total, users });
};

const createUser = async (req = request, res = response) => {
  const { name, email, role, password } = req.body;
  const user = new User({ name, email, role, password });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  user.save();
  res.json({ user });
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);
  res.json({ user });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // Delete physically
  // const user = await User.findByIdAndDelete(id);

  // Delete Logically
  const user = await User.findByIdAndUpdate(id, { isActive: false });
  res.json(user);
};

export { getAllUsers, createUser, updateUser, deleteUser };

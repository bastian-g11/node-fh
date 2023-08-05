import Role from '../models/role.js';
import User from '../models/user.js';

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role: ${role} is not registered in the DB`);
  }
};

const emailExists = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`Email already registered`);
  }
};

const userExistsById = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`ID: ${id} does not exist`);
  }
};

export { isRoleValid, emailExists, userExistsById };

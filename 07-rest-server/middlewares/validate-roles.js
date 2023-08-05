import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({ msg: 'Token not validated' });
  }
  const { role, name } = req.user;
  if (role !== 'ADMIN') {
    return res.status(401).json({ msg: `User ${name} is not an admin` });
  }
  next();
};

const hasRole = (...roles) => {
  /** It returns a function in order to be used in the middleware chain */
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({ msg: 'Token not validated' });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: `Service requires one of these roles: ${roles}` });
    }
    next();
  };
};

export { isAdminRole, hasRole };

import { Router } from 'express';
import { check } from 'express-validator';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/user.controller.js';
import {
  emailExists,
  isRoleValid,
  userExistsById,
} from '../helpers/db-validators.js';
import { validateFields, validateJWT, hasRole } from '../middlewares/index.js';

const router = Router();

router.get('/', getAllUsers);

router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and has at least 6 characters'
    ).isLength({ min: 6 }),
    // check('role', 'Role is not valid').isIn(['USER', 'ADMIN']),
    check('role').custom(isRoleValid),
    check('email').custom(emailExists),
    validateFields,
  ],
  createUser
);

router.put(
  '/:id',
  [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN'),
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
  ],
  deleteUser
);

export default router;

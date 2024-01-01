import express from 'express';
import {
  deleteUser,
  findOneOrder,
  findUserOrders,
  login,
  registerUser,
  updateProfile,
} from './user.controller.js';
import {
  protect,
  protectAccountOwner,
  validateExistUser,
} from './user.middleware.js';

export const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', login);

router.use(protect);
router.patch('/:id', validateExistUser, protectAccountOwner, updateProfile);
router.delete('/:id', validateExistUser, protectAccountOwner, deleteUser);

router.get('/orders', findUserOrders);
router.get('/orders/:id', findOneOrder);

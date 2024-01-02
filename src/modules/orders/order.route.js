import express from 'express';
import {
  createOrder,
  deleteOrder,
  findAllOrdersbyUser,
  updateOrder,
} from './order.controller.js';
import { protect, protectAccountOwner } from '../users/user.middleware.js';
import { validateExistMeal } from '../meals/meal.middleware.js';
import { validateExistOrder } from './order.middleware.js';

export const router = express.Router();

router.use(protect);
router.post('/', validateExistMeal, createOrder);
router.get('/me', findAllOrdersbyUser);
router
  .route('/:id')
  .patch(validateExistOrder, protectAccountOwner, updateOrder)
  .delete(validateExistOrder, protectAccountOwner, deleteOrder);

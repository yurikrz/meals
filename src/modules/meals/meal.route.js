import express from 'express';
import {
  createMeal,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from './meal.controller.js';
import { validateExistMeal } from './meal.middleware.js';
import { validateExistRestaurant } from '../restaurants/restaurant.middleware.js';
import { protect, restrictTo } from '../users/user.middleware.js';
import { uploadSingle } from '../../config/plugins/upload-files.plugin.js';

export const router = express.Router();

router.get('/', findAllMeals);
router.get('/:id', validateExistMeal, findOneMeal);

router.use(protect);
router
  .route('/:id')
  .post(
    restrictTo('admin'),
    validateExistRestaurant,
    uploadSingle('photo'),
    createMeal
  )
  .patch(
    restrictTo('admin'),
    validateExistMeal,
    uploadSingle('photo'),
    updateMeal
  )
  .delete(restrictTo('admin'), validateExistMeal, deleteMeal);

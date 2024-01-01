import express from 'express';
import {
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
  updateReview,
} from './restaurant.controller.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
} from '../users/user.middleware.js';
import {
  validateExistRestaurant,
  validateExistReview,
} from './restaurant.middleware.js';

export const router = express.Router();

router.get('/', findAllRestaurants);
router.get('/:id', validateExistRestaurant, findOneRestaurant);

router.use(protect);

router.post('/', restrictTo('admin'), createRestaurant);
router
  .route('/:id')
  .patch(restrictTo('admin'), validateExistRestaurant, updateRestaurant)
  .delete(restrictTo('admin'), validateExistRestaurant, deleteRestaurant);
router.post('/reviews/:id', validateExistRestaurant, createReview);
router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validateExistRestaurant,
    validateExistReview,
    protectAccountOwner,
    updateReview
  )
  .delete(
    validateExistRestaurant,
    validateExistReview,
    protectAccountOwner,
    deleteReview
  );

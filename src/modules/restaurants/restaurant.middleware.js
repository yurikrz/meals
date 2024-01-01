import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RestaurantService } from './restaurant.service.js';

export const validateExistRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  let resId = restaurantId || id;

  const restaurant = await RestaurantService.findOneRestaurant(resId);

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${resId} not found`));
  }

  req.restaurant = restaurant;

  next();
});

export const validateExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await RestaurantService.findOneReview(id);

  if (!review) {
    return next(new AppError(`Review with id: ${id} not found`));
  }

  req.review = review;
  req.user = review.user;

  next();
});

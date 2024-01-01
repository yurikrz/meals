import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  validatePartialRestaurant,
  validateRestaurant,
} from './restaurant.schema.js';
import { RestaurantService } from './restaurant.service.js';
import { validatePartialReview, validateReview } from './review.schema.js';

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const restaurant = await RestaurantService.createRestaurant(restaurantData);

  return res.status(201).json(restaurant);
});

export const findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await RestaurantService.findAllRestaurant();
  return res.status(201).json(restaurants);
});

export const findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  return res.status(200).json(restaurant);
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { hasError, errorMessage, restaurantData } = validatePartialRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const restaurantUpdate = await RestaurantService.updateRestaurant(
    restaurant,
    {
      name: restaurantData.name,
      address: restaurantData.address,
    }
  );
  console.log(restaurantUpdate);
  return res.status(200).json({
    id: restaurantUpdate.id,
    name: restaurantUpdate.name,
    address: restaurantUpdate.address,
  });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await RestaurantService.deleteRestaurant(restaurant);
  return res.status(204).json(null);
});

export const createReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  const { hasError, errorMessage, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const review = await RestaurantService.createReview({
    userId: sessionUser.id,
    comment: reviewData.comment,
    restaurantId: id,
    rating: reviewData.rating,
  });

  return res.status(201).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { review, restaurant } = req;
  const { hasError, errorMessage, reviewData } = validatePartialReview(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  if (review.restaurantId !== restaurant.id) {
    return next(
      new AppError(
        `Review with id ${review.id} doesn't belong to restaurant id ${restaurant.id}`,
        400
      )
    );
  }

  const reviewUpdate = await RestaurantService.updateReview(review, reviewData);
  return res.status(200).json({
    id: reviewUpdate.id,
    userId: reviewUpdate.userId,
    restaurantId: reviewUpdate.restaurantId,
    comment: reviewUpdate.comment,
    rating: reviewUpdate.rating,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review, restaurant } = req;

  if (review.restaurantId !== restaurant.id) {
    return next(
      new AppError(
        `Review with id ${review.id} doesn't belong to restaurant id ${restaurant.id}`,
        400
      )
    );
  }

  await RestaurantService.deleteReview(review);
  return res.status(204).json(null);
});

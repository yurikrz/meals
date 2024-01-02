import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealService } from './meal.service.js';

export const validateExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let mealId = id || req.body.mealId;

  const meal = mealId ? await MealService.findOne(mealId) : null;

  if (!meal) {
    return next(new AppError(`Meal with id: ${mealId} not found`));
  }

  req.meal = meal;

  next();
});

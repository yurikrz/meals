import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMeal, validatePartialMeal } from './meal.schema.js';
import { MealService } from './meal.service.js';

export const findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await MealService.findAll();
  return res.status(201).json(meals);
});

export const findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  return res.status(200).json(meal);
});

export const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hasError, errorMessage, mealData } = validateMeal(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const meal = await MealService.create({ restaurantId: id, ...mealData });
  return res.status(200).json(meal);
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, mealData } = validatePartialMeal(req.body);
  const { meal } = req;

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const mealUpdated = await MealService.update(meal, mealData);
  return res.status(200).json(mealUpdated);
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await MealService.delete(meal);
  return res.status(204).json(null);
});

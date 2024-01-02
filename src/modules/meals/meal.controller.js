import { catchAsync } from '../../common/errors/catchAsync.js';
import { UploadFile } from '../../common/utils/upload-files-cloud.js';
import { generateUUID } from '../../config/plugins/generate-uudi.plugin.js';
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
  const dataBody = {
    name: req.body.name,
    price: +req.body.price,
  };
  const { hasError, errorMessage, mealData } = validateMeal(dataBody);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  if (req.file) {
    const path = `meal/${generateUUID()}-${req.file.originalname}`;
    const photoUrl = await UploadFile.uploadToFirebase(path, req.file.buffer);
    mealData.photo = photoUrl;
  }

  mealData.restaurantId = id;

  const meal = await MealService.create(mealData);
  return res.status(200).json(meal);
});

export const updateMeal = catchAsync(async (req, res, next) => {
  console.log(req.body);
  req.body.price = +req.body.price;
  console.log(req.body);
  // const dataBody = {
  //   name: req.body.name,
  //   price: +req.body.price,
  // };
  // const { hasError, errorMessage, mealData } = validatePartialMeal(dataBody);
  // const { meal } = req;

  // if (hasError) {
  //   return res.status(422).json({
  //     status: 'error',
  //     message: errorMessage,
  //   });
  // }

  // if (req.file) {
  //   const path = `meal/${generateUUID()}-${req.file.originalname}`;
  //   const photoUrl = await UploadFile.uploadToFirebase(path, req.file.buffer);
  //   mealData.photo = photoUrl;

  //   if (meal.photo) {
  //     const url_token = meal.photo.split('?');
  //     const url = url_token[0].split('/');
  //     const pathFileToDelete = url[url.length - 1].replaceAll('%2F', '/');
  //     const photodeleted = await UploadFile.deleteFromFirebase(
  //       pathFileToDelete
  //     );
  //     console.log(photodeleted);
  //   }
  // }

  // const mealUpdated = await MealService.update(meal, mealData);
  // return res.status(200).json(mealUpdated);
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await MealService.delete(meal);
  return res.status(204).json(null);
});

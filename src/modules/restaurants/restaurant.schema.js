import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const restaurantSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(50, { message: 'Name must be 50 or fewer characters long' }),
  address: z
    .string({
      required_error: 'Address is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Address must be 3 or more characters long' })
    .max(100, { message: 'Address must be 50 or fewer characters long' }),
  rating: z
    .number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    })
    .gte(1, { message: 'Rating must be a number between 1 and 5' })
    .lte(5, { message: 'Rating must be a number between 1 and 5' }),
});

export const validateRestaurant = (data) => {
  const result = restaurantSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    restaurantData,
  };
};

export const validatePartialRestaurant = (data) => {
  const result = restaurantSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessage,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    restaurantData,
  };
};

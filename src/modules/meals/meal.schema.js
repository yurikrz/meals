import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const mealSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(100, { message: 'Name must be 100 or fewer characters long' }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be a positive number' }),
});

export const validateMeal = (data) => {
  const result = mealSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    mealData,
  };
};

export const validatePartialMeal = (data) => {
  const result = mealSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessage,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    mealData,
  };
};

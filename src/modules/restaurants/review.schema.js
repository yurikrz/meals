import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const reviewSchema = z.object({
  comment: z
    .string({
      invalid_type_error: 'Comment must be a string',
      required_error: 'Comment is required',
    })
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(254, { message: 'Name must be 244 or fewer characters long' }),
  rating: z
    .number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    })
    .gte(1, { message: 'Rating must be a number between 1 and 5' })
    .lte(5, { message: 'Rating must be a number between 1 and 5' }),
});

export const validateReview = (data) => {
  const result = reviewSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    reviewData,
  };
};

export const validatePartialReview = (data) => {
  const result = reviewSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    reviewData,
  };
};

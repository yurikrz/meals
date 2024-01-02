import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const orderSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: 'Quantity must be a number',
      required_error: 'Quantity is required',
    })
    .min(1, {
      message: 'Quantity must be a number greater than or equal to 1',
    }),
  mealId: z
    .number({
      required_error: 'Meal Id is required',
      invalid_type_error: 'Meal Id must be a number',
    })
    .positive({ message: 'Meal Id must be a positive number' }),
});

export const validateOrder = (data) => {
  const result = orderSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: orderData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    orderData,
  };
};

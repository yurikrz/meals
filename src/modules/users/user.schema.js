import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const signUpSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must be 3 or more characters long' })
    .max(50, { message: 'Name must be 50 or fewer characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' })
    .max(80, { message: 'Email is too long' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be 8 or more characters long' })
    .max(16, { message: 'Password must be 16 or fewer characters long' }),
  role: z.enum(['normal', 'admin']).optional(),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' })
    .max(80, { message: 'Email is too long' }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export const validateSignUp = (data) => {
  const result = signUpSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validatePartialUser = (data) => {
  const result = signUpSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

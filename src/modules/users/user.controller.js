import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encrypted-password.plugin.js';
import { generateJWT } from '../../config/plugins/generate-jwt.plugin.js';
import {
  validateLogin,
  validatePartialUser,
  validateSignUp,
} from './user.schema.js';
import { UserService } from './user.service.js';

export const registerUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateSignUp(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await UserService.create(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await UserService.findOneByEmail(userData.email);

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  const isOkPassword = await verifyPassword(userData.password, user.password);

  if (!isOkPassword) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validatePartialUser(req.body);
  const { user } = req;

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { name, email } = userData;

  const userUpdated = await UserService.update(user, { name, email });

  return res.status(200).json({
    id: userUpdated.id,
    name: userUpdated.name,
    email: userUpdated.email,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await UserService.delete(user);
  return res.status(204).json(null);
});

export const findUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await UserService.findAllUserOrder(sessionUser.id);
  return res.status(201).json(orders.orders);
});

export const findOneOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const order = await UserService.findOneUserOrder(sessionUser.id, id);

  if (order.length < 1) {
    return next(new AppError(`Order ${id} not found for this user`, 401));
  }

  return res.status(201).json(order.orders);
});

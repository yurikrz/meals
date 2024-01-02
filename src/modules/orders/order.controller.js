import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateOrder } from './order.schema.js';
import { OrderService } from './order.service.js';

export const createOrder = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, orderData } = validateOrder(req.body);
  const { meal } = req;
  const { sessionUser } = req;

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  let totalPrice = orderData.quantity * meal.price;

  const order = await OrderService.create({
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice,
    quantity: orderData.quantity,
  });
  return res.status(200).json(order);
});

export const findAllOrdersbyUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await OrderService.findAllOrdersByUser(sessionUser.id);
  return res.status(200).json(orders);
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  const orderUpdated = await OrderService.update(order);
  return res.status(200).json({
    id: orderUpdated.id,
    mealId: orderUpdated.mealId,
    userId: orderUpdated.userId,
    quantity: orderUpdated.quantity,
    totalPrice: orderUpdated.totalPrice,
    status: orderUpdated.status,
  });
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await OrderService.delete(order);
  return res.status(204).json(null);
});

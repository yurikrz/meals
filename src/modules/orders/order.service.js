import { Meal } from '../meals/meal.model.js';
import { Restaurant } from '../restaurants/restaurant.model.js';
import { User } from '../users/user.model.js';
import { Order } from './order.model.js';

export class OrderService {
  static async create(data) {
    return await Order.create(data);
  }

  static async update(order) {
    return await order.update({ status: 'completed' });
  }

  static async delete(order) {
    return await order.update({ status: 'cancelled' });
  }

  static async findAllOrdersByUser(userId) {
    return await Order.findAll({
      where: {
        userId: userId,
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'user_id', 'meal_id'] },
      include: [
        {
          model: Meal,
          attributes: {
            exclude: ['status', 'createdAt', 'updatedAt', 'restaurant_id'],
          },
          include: [
            {
              model: Restaurant,
              attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });
  }

  static async findOneOrder(id) {
    return await Order.findOne({
      where: {
        id: id,
        status: 'active',
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }
}

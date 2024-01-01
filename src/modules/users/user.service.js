import { Meal } from '../meals/meal.model.js';
import { Order } from '../orders/order.model.js';
import { Restaurant } from '../restaurants/restaurant.model.js';
import { User } from './user.model.js';

export class UserService {
  static async create(data) {
    return await User.create(data);
  }

  static async findOneByEmail(email) {
    return await User.findOne({
      where: {
        status: true,
        email: email,
      },
    });
  }

  static async findOne(id) {
    return await User.findOne({
      where: {
        status: true,
        id: id,
      },
    });
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({ status: false });
  }

  static async findAllUserOrder(id) {
    return await User.findAll({
      attributes: {
        exclude: ['password', 'role', 'status', 'createdAt', 'updatedAt'],
      },
      where: {
        id: id,
      },
      include: [
        {
          model: Order,
          attributes: ['id', 'meal_id', 'user_id', 'total_price', 'quantity'],
          include: [
            {
              model: Meal,
              attributes: ['id', 'name', 'price', 'restaurant_id'],
              include: [
                {
                  model: Restaurant,
                  attributes: ['id', 'name', 'address', 'rating'],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  static async findOneUserOrder(userId, orderId) {
    return await User.findOne({
      attributes: {
        exclude: ['password', 'role', 'status', 'createdAt', 'updatedAt'],
      },
      where: {
        id: userId,
      },
      include: [
        {
          model: Order,
          where: {
            id: orderId,
          },
          attributes: ['id', 'meal_id', 'user_id', 'total_price', 'quantity'],
          include: [
            {
              model: Meal,
              attributes: ['id', 'name', 'price', 'restaurant_id'],
              include: [
                {
                  model: Restaurant,
                  attributes: ['id', 'name', 'address', 'rating'],
                },
              ],
            },
          ],
        },
      ],
    });
  }
}

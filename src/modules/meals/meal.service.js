import { Restaurant } from '../restaurants/restaurant.model.js';
import { Meal } from './meal.model.js';

export class MealService {
  static async findAll() {
    return await Meal.findAll({
      where: { status: true },
      attributes: {
        exclude: ['status', 'createdAt', 'updatedAt', 'restaurant_id'],
      },
      include: [
        {
          model: Restaurant,
          attributes: {
            exclude: ['status', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
  }

  static async findOne(id) {
    return await Meal.findOne({
      where: { status: true, id: id },
      attributes: {
        exclude: ['status', 'createdAt', 'updatedAt', 'restaurant_id'],
      },
      include: [
        {
          model: Restaurant,
          attributes: {
            exclude: ['status', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });
  }

  static async create(data) {
    return await Meal.create(data);
  }

  static async update(meal, data) {
    return await meal.update(data);
  }

  static async delete(meal) {
    return await meal.update({ status: false });
  }
}

import { User } from '../users/user.model.js';
import { Restaurant } from './restaurant.model.js';
import { Review } from './review.model.js';

export class RestaurantService {
  static async createRestaurant(data) {
    return Restaurant.create(data);
  }

  static async findAllRestaurant() {
    return Restaurant.findAll({
      where: {
        status: true,
      },
      attributes: {
        exclude: ['status', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Review,
          attributes: ['id', 'user_id', 'restaurant_id', 'comment', 'rating'],
        },
      ],
    });
  }

  static async findOneRestaurant(id) {
    return Restaurant.findOne({
      where: {
        status: true,
        id: id,
      },
      attributes: {
        exclude: ['status', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Review,
          attributes: ['id', 'user_id', 'restaurant_id', 'comment', 'rating'],
        },
      ],
    });
  }

  static async updateRestaurant(restaurant, data) {
    return restaurant.update(data);
  }

  static async deleteRestaurant(restaurant) {
    return restaurant.update({
      status: false,
    });
  }

  static async createReview(data) {
    return Review.create(data);
  }

  static async updateReview(review, data) {
    return review.update(data);
  }

  static async deleteReview(review) {
    return review.update({
      status: false,
    });
  }

  static async findOneReview(id) {
    return Review.findOne({
      where: {
        status: true,
        id: id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }
}

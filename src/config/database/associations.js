import { Meal } from '../../modules/meals/meal.model.js';
import { Order } from '../../modules/orders/order.model.js';
import { Restaurant } from '../../modules/restaurants/restaurant.model.js';
import { Review } from '../../modules/restaurants/review.model.js';
import { User } from '../../modules/users/user.model.js';

export const initModel = () => {
  User.hasMany(Order, { foreignKey: 'user_id' });
  Order.belongsTo(User, { foreignKey: 'user_id' });

  User.hasMany(Review, { foreignKey: 'user_id' });
  Review.belongsTo(User, { foreignKey: 'user_id' });

  Meal.hasOne(Order, { foreignKey: 'meal_id' });
  Order.belongsTo(Meal, { foreignKey: 'meal_id' });

  Restaurant.hasMany(Meal, { foreignKey: 'restaurant_id' });
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

  Restaurant.hasMany(Review, { foreignKey: 'restaurant_id' });
  Review.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
};

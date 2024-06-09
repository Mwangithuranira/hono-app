import { Hono } from 'hono';
import { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantByName } from './restaurant.controller';

export const restaurantRouter = new Hono();

// Get all restaurants      api/restaurants
restaurantRouter.get('/restaurants', getAllRestaurants);
// Get a single restaurant  api/restaurants/1
restaurantRouter.get('/restaurants/:id', getRestaurantById);
// Search restaurants by name  api/restaurants/search/name
restaurantRouter.get('/restaurants/search/:name', getRestaurantByName);
// Create a restaurant      api/restaurants
restaurantRouter.post('/restaurants', createRestaurant);
// Update a restaurant      api/restaurants/1
restaurantRouter.put('/restaurants/:id', updateRestaurant);
// Delete a restaurant      api/restaurants/1
restaurantRouter.delete('/restaurants/:id', deleteRestaurant);

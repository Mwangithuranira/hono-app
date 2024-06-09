import { Hono } from 'hono';
import { RestaurantOwnerController } from './restaurant_owner.controller';
import { RestaurantOwnerService } from './restaurant_owner.service';

const restaurantOwnerService = new RestaurantOwnerService();
const restaurantOwnerController = new RestaurantOwnerController(restaurantOwnerService);

export const restaurantOwnerRouter = new Hono();

// Define routes
restaurantOwnerRouter.get('/restaurant-owners', restaurantOwnerController.getAllRestaurantOwners.bind(restaurantOwnerController));
restaurantOwnerRouter.get('/restaurant-owners/:id', restaurantOwnerController.getRestaurantOwnerById.bind(restaurantOwnerController));
restaurantOwnerRouter.post('/restaurant-owners', restaurantOwnerController.createRestaurantOwner.bind(restaurantOwnerController));
restaurantOwnerRouter.put('/restaurant-owners/:id', restaurantOwnerController.updateRestaurantOwner.bind(restaurantOwnerController));
restaurantOwnerRouter.delete('/restaurant-owners/:id', restaurantOwnerController.deleteRestaurantOwner.bind(restaurantOwnerController));
restaurantOwnerRouter.get('/restaurant-owners/search/:name', restaurantOwnerController.getRestaurantOwnerByName.bind(restaurantOwnerController));

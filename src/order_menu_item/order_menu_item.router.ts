import { Hono } from 'hono';
import { OrderMenuItemController } from './order_menu_item.controller';
import { OrderMenuItemService } from './order_menu_item.service';

const orderMenuItemService = new OrderMenuItemService();
const orderMenuItemController = new OrderMenuItemController(orderMenuItemService);

export const orderMenuItemRouter = new Hono();

// Define routes
orderMenuItemRouter.get('/order-menu-items', orderMenuItemController.getAllOrderMenuItems.bind(orderMenuItemController));
orderMenuItemRouter.get('/order-menu-items/:id', orderMenuItemController.getOrderMenuItemById.bind(orderMenuItemController));
orderMenuItemRouter.post('/order-menu-items', orderMenuItemController.createOrderMenuItem.bind(orderMenuItemController));
orderMenuItemRouter.put('/order-menu-items/:id', orderMenuItemController.updateOrderMenuItem.bind(orderMenuItemController));
orderMenuItemRouter.delete('/order-menu-items/:id', orderMenuItemController.deleteOrderMenuItem.bind(orderMenuItemController));
orderMenuItemRouter.get('/order-menu-items/search/:name', orderMenuItemController.getOrderMenuItemByName.bind(orderMenuItemController));

import { Hono } from 'hono';
import { MenuItemController } from './menu_item.controller';
import { MenuItemService } from './menu_item.service';

const menuItemService = new MenuItemService();
const menuItemController = new MenuItemController(menuItemService);

export const menuItemRouter = new Hono();

// Define routes
menuItemRouter.get('/menu-items', menuItemController.getAllMenuItems.bind(menuItemController));
menuItemRouter.get('/menu-items/:id', menuItemController.getMenuItemById.bind(menuItemController));
menuItemRouter.post('/menu-items', menuItemController.createMenuItem.bind(menuItemController));
menuItemRouter.put('/menu-items/:id', menuItemController.updateMenuItem.bind(menuItemController));
menuItemRouter.delete('/menu-items/:id', menuItemController.deleteMenuItem.bind(menuItemController));
menuItemRouter.get('/menu-items/search/:name', menuItemController.getMenuItemByName.bind(menuItemController));

import { Context } from 'hono';
import { MenuItemService } from './menu_item.service';

export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) {}

    async getAllMenuItems(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.menuItemService.getAllMenuItems(limit);
            if (!data || data.length === 0) {
                return c.text("No menu items found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getMenuItemById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const menuItem = await this.menuItemService.getMenuItemById(id);
        if (!menuItem) {
            return c.text("Menu item not found", 404);
        }
        return c.json(menuItem, 200);
    }

    async createMenuItem(c: Context) {
        try {
            const menuItem = await c.req.json();
            const createdMenuItem = await this.menuItemService.createMenuItem(menuItem);

            if (!createdMenuItem) return c.text("Menu item not created", 404);
            return c.json({ msg: createdMenuItem }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateMenuItem(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const menuItem = await c.req.json();
        try {
            const searchedMenuItem = await this.menuItemService.getMenuItemById(id);
            if (!searchedMenuItem) return c.text("Menu item not found", 404);

            const res = await this.menuItemService.updateMenuItem(id, menuItem);
            if (!res) return c.text("Menu item not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteMenuItem(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const menuItem = await this.menuItemService.getMenuItemById(id);
            if (!menuItem) return c.text("Menu item not found", 404);

            const res = await this.menuItemService.deleteMenuItem(id);
            if (!res) return c.text("Menu item not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getMenuItemByName(c: Context) {
        const name = c.req.param("name");
        if (typeof name !== "string") return c.text("Invalid name", 400);

        const menuItem = await this.menuItemService.getMenuItemByName(name);
        if (!menuItem) {
            return c.text("Menu item not found", 404);
        }
        return c.json(menuItem, 200);
    }
}

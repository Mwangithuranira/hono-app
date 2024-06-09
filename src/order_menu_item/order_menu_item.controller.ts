import { Context } from 'hono';
import { OrderMenuItemService } from './order_menu_item.service';

export class OrderMenuItemController {
    constructor(private readonly orderMenuItemService: OrderMenuItemService) {}

    async getAllOrderMenuItems(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.orderMenuItemService.getAllOrderMenuItems(limit);
            if (!data || data.length === 0) {
                return c.text("No order menu items found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getOrderMenuItemById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderMenuItem = await this.orderMenuItemService.getOrderMenuItemById(id);
        if (!orderMenuItem) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(orderMenuItem, 200);
    }

    async createOrderMenuItem(c: Context) {
        try {
            const orderMenuItem = await c.req.json();
            const createdOrderMenuItem = await this.orderMenuItemService.createOrderMenuItem(orderMenuItem);

            if (!createdOrderMenuItem) return c.text("Order menu item not created", 404);
            return c.json({ msg: createdOrderMenuItem }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateOrderMenuItem(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderMenuItem = await c.req.json();
        try {
            const searchedOrderMenuItem = await this.orderMenuItemService.getOrderMenuItemById(id);
            if (!searchedOrderMenuItem) return c.text("Order menu item not found", 404);

            const res = await this.orderMenuItemService.updateOrderMenuItem(id, orderMenuItem);
            if (!res) return c.text("Order menu item not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteOrderMenuItem(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const orderMenuItem = await this.orderMenuItemService.getOrderMenuItemById(id);
            if (!orderMenuItem) return c.text("Order menu item not found", 404);

            const res = await this.orderMenuItemService.deleteOrderMenuItem(id);
            if (!res) return c.text("Order menu item not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getOrderMenuItemByName(c: Context) {
        const name = c.req.param("name");
        if (typeof name !== "string") return c.text("Invalid name", 400);

        const orderMenuItem = await this.orderMenuItemService.getOrderMenuItemByName(name);
        if (!orderMenuItem) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(orderMenuItem, 200);
    }
}

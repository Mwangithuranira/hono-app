import { Context } from 'hono';
import { OrderService } from './orders.service';

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    async getAllOrders(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.orderService.getAllOrders(limit);
            if (!data || data.length === 0) {
                return c.text("No orders found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getOrderById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const order = await this.orderService.getOrderById(id);
        if (!order) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    }

    async createOrder(c: Context) {
        try {
            const order = await c.req.json();
            const createdOrder = await this.orderService.createOrder(order);

            if (!createdOrder) return c.text("Order not created", 404);
            return c.json({ msg: createdOrder }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateOrder(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const order = await c.req.json();
        try {
            const searchedOrder = await this.orderService.getOrderById(id);
            if (!searchedOrder) return c.text("Order not found", 404);

            const res = await this.orderService.updateOrder(id, order);
            if (!res) return c.text("Order not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteOrder(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const order = await this.orderService.getOrderById(id);
            if (!order) return c.text("Order not found", 404);

            const res = await this.orderService.deleteOrder(id);
            if (!res) return c.text("Order not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getOrderByStatus(c: Context) {
        const status = c.req.param("status");
        if (typeof status !== "string") return c.text("Invalid status", 400);

        const order = await this.orderService.getOrderByStatus(status);
        if (!order) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    }
}

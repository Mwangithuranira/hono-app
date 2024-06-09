import { Context } from 'hono';
import { OrderStatusService } from './order_status.service';

export class OrderStatusController {
    constructor(private readonly orderStatusService: OrderStatusService) {}

    async getAllOrderStatuses(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.orderStatusService.getAllOrderStatuses(limit);
            if (!data || data.length === 0) {
                return c.text("No order statuses found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getOrderStatusById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderStatus = await this.orderStatusService.getOrderStatusById(id);
        if (!orderStatus) {
            return c.text("Order status not found", 404);
        }
        return c.json(orderStatus, 200);
    }

    async createOrderStatus(c: Context) {
        try {
            const orderStatus = await c.req.json();
            const createdOrderStatus = await this.orderStatusService.createOrderStatus(orderStatus);

            if (!createdOrderStatus) return c.text("Order status not created", 404);
            return c.json({ msg: createdOrderStatus }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateOrderStatus(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const orderStatus = await c.req.json();
        try {
            const searchedOrderStatus = await this.orderStatusService.getOrderStatusById(id);
            if (!searchedOrderStatus) return c.text("Order status not found", 404);

            const res = await this.orderStatusService.updateOrderStatus(id, orderStatus);
            if (!res) return c.text("Order status not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteOrderStatus(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const orderStatus = await this.orderStatusService.getOrderStatusById(id);
            if (!orderStatus) return c.text("Order status not found", 404);

            const res = await this.orderStatusService.deleteOrderStatus(id);
            if (!res) return c.text("Order status not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getOrderStatusByName(c: Context) {
        const name = c.req.param("name");
        if (typeof name !== "string") return c.text("Invalid name", 400);

        const orderStatus = await this.orderStatusService.getOrderStatusByName(name);
        if (!orderStatus) {
            return c.text("Order status not found", 404);
        }
        return c.json(orderStatus, 200);
    }
}

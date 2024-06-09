import db from "../drizzle/db";
import { TIOrders, TSOrders, OrdersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class OrderService {
    async getAllOrders(limit?: number): Promise<TSOrders[] | null> {
        if (limit) {
            return await db.query.OrdersTable.findMany({
                limit: limit
            });
        }
        return await db.query.OrdersTable.findMany();
    }

    async getOrderById(id: number): Promise<TIOrders | undefined> {
        return await db.query.OrdersTable.findFirst({
            where: eq(OrdersTable.id, id)
        });
    }

    async createOrder(order: TIOrders) {
        await db.insert(OrdersTable).values(order);
        return "Order created successfully";
    }

    async updateOrder(id: number, order: TIOrders) {
        await db.update(OrdersTable).set(order).where(eq(OrdersTable.id, id));
        return "Order updated successfully";
    }

    async deleteOrder(id: number) {
        await db.delete(OrdersTable).where(eq(OrdersTable.id, id));
        return "Order deleted successfully";
    }

    async getOrderByStatus(restaurant_id: string): Promise<TIOrders | undefined> {
        return await db.query.OrdersTable.findFirst({
            where: eq(OrdersTable.restaurant_id, parseInt(restaurant_id))
        });
    }
}

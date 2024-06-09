import db from "../drizzle/db";
import { TIOrderStatus, TSOrderStatus, OrderStatusTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class OrderStatusService {
    async getAllOrderStatuses(limit?: number): Promise<TSOrderStatus[] | null> {
        if (limit) {
            return await db.query.OrderStatusTable.findMany({
                limit: limit
            });
        }
        return await db.query.OrderStatusTable.findMany();
    }

    async getOrderStatusById(id: number): Promise<TIOrderStatus | undefined> {
        return await db.query.OrderStatusTable.findFirst({
            where: eq(OrderStatusTable.id, id)
        });
    }

    async createOrderStatus(orderStatus: TIOrderStatus) {
        await db.insert(OrderStatusTable).values(orderStatus);
        return "Order status created successfully";
    }

    async updateOrderStatus(id: number, orderStatus: TIOrderStatus) {
        await db.update(OrderStatusTable).set(orderStatus).where(eq(OrderStatusTable.id, id));
        return "Order status updated successfully";
    }

    async deleteOrderStatus(id: number) {
        await db.delete(OrderStatusTable).where(eq(OrderStatusTable.id, id));
        return "Order status deleted successfully";
    }

    async getOrderStatusByName(order_id: string): Promise<TIOrderStatus | undefined> {
        return await db.query.OrderStatusTable.findFirst({
            where: eq(OrderStatusTable.order_id, parseInt(order_id))
        });
    }
}

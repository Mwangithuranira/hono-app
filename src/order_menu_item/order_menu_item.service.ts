import db from "../drizzle/db";
import { TIOrderMenuItem, TSOrderMenuItem, OrderMenuItemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class OrderMenuItemService {
    async getAllOrderMenuItems(limit?: number): Promise<TSOrderMenuItem[] | null> {
        if (limit) {
            return await db.query.OrderMenuItemTable.findMany({
                limit: limit
            });
        }
        return await db.query.OrderMenuItemTable.findMany();
    }

    async getOrderMenuItemById(id: number): Promise<TIOrderMenuItem | undefined> {
        return await db.query.OrderMenuItemTable.findFirst({
            where: eq(OrderMenuItemTable.id, id)
        });
    }

    async createOrderMenuItem(orderMenuItem: TIOrderMenuItem) {
        await db.insert(OrderMenuItemTable).values(orderMenuItem);
        return "Order menu item created successfully";
    }

    async updateOrderMenuItem(id: number, orderMenuItem: TIOrderMenuItem) {
        await db.update(OrderMenuItemTable).set(orderMenuItem).where(eq(OrderMenuItemTable.id, id));
        return "Order menu item updated successfully";
    }

    async deleteOrderMenuItem(id: number) {
        await db.delete(OrderMenuItemTable).where(eq(OrderMenuItemTable.id, id));
        return "Order menu item deleted successfully";
    }

    async getOrderMenuItemByName(order_id: string): Promise<TIOrderMenuItem | undefined> {
        return await db.query.OrderMenuItemTable.findFirst({
            where: eq(OrderMenuItemTable.order_id, parseInt(order_id))
        });
    }
}

import db from "../drizzle/db";
import { TIMenuItem, TSMenuItem, MenuItemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class MenuItemService {
    async getAllMenuItems(limit?: number): Promise<TSMenuItem[] | null> {
        if (limit) {
            return await db.query.MenuItemTable.findMany({
                limit: limit
            });
        }
        return await db.query.MenuItemTable.findMany();
    }

    async getMenuItemById(id: number): Promise<TIMenuItem | undefined> {
        return await db.query.MenuItemTable.findFirst({
            where: eq(MenuItemTable.id, id)
        });
    }

    async createMenuItem(menuItem: TIMenuItem) {
        await db.insert(MenuItemTable).values(menuItem);
        return "Menu item created successfully";
    }

    async updateMenuItem(id: number, menuItem: TIMenuItem) {
        await db.update(MenuItemTable).set(menuItem).where(eq(MenuItemTable.id, id));
        return "Menu item updated successfully";
    }

    async deleteMenuItem(id: number) {
        await db.delete(MenuItemTable).where(eq(MenuItemTable.id, id));
        return "Menu item deleted successfully";
    }

    async getMenuItemByName(name: string): Promise<TIMenuItem | undefined> {
        return await db.query.MenuItemTable.findFirst({
            where: eq(MenuItemTable.name, name)
        });
    }
}

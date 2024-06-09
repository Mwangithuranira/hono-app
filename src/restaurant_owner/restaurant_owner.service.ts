import db from "../drizzle/db";
import { TIRestaurantOwner, TSRestaurantOwner, RestaurantOwnerTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class RestaurantOwnerService {
    async getAllRestaurantOwners(limit?: number): Promise<TSRestaurantOwner[] | null> {
        if (limit) {
            return await db.query.RestaurantOwnerTable.findMany({
                limit: limit
            });
        }
        return await db.query.RestaurantOwnerTable.findMany();
    }

    async getRestaurantOwnerById(id: number): Promise<TIRestaurantOwner | undefined> {
        return await db.query.RestaurantOwnerTable.findFirst({
            where: eq(RestaurantOwnerTable.id, id)
        });
    }

    async createRestaurantOwner(restaurantOwner: TIRestaurantOwner) {
        await db.insert(RestaurantOwnerTable).values(restaurantOwner);
        return "Restaurant owner created successfully";
    }

    async updateRestaurantOwner(id: number, restaurantOwner: TIRestaurantOwner) {
        await db.update(RestaurantOwnerTable).set(restaurantOwner).where(eq(RestaurantOwnerTable.id, id));
        return "Restaurant owner updated successfully";
    }

    async deleteRestaurantOwner(id: number) {
        await db.delete(RestaurantOwnerTable).where(eq(RestaurantOwnerTable.id, id));
        return "Restaurant owner deleted successfully";
    }

    async getRestaurantOwnerByName(restaurant_id: string): Promise<TIRestaurantOwner | undefined> {
        return await db.query.RestaurantOwnerTable.findFirst({
            where: eq(RestaurantOwnerTable.restaurant_id, parseInt(restaurant_id))
        });
    }
}

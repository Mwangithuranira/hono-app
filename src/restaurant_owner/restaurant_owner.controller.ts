import { Context } from 'hono';
import { RestaurantOwnerService } from './restaurant_owner.service';

export class RestaurantOwnerController {
    constructor(private readonly restaurantOwnerService: RestaurantOwnerService) {}

    async getAllRestaurantOwners(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.restaurantOwnerService.getAllRestaurantOwners(limit);
            if (!data || data.length === 0) {
                return c.text("No restaurant owners found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getRestaurantOwnerById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const restaurantOwner = await this.restaurantOwnerService.getRestaurantOwnerById(id);
        if (!restaurantOwner) {
            return c.text("Restaurant owner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    }

    async createRestaurantOwner(c: Context) {
        try {
            const restaurantOwner = await c.req.json();
            const createdRestaurantOwner = await this.restaurantOwnerService.createRestaurantOwner(restaurantOwner);

            if (!createdRestaurantOwner) return c.text("Restaurant owner not created", 404);
            return c.json({ msg: createdRestaurantOwner }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateRestaurantOwner(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const restaurantOwner = await c.req.json();
        try {
            const searchedRestaurantOwner = await this.restaurantOwnerService.getRestaurantOwnerById(id);
            if (!searchedRestaurantOwner) return c.text("Restaurant owner not found", 404);

            const res = await this.restaurantOwnerService.updateRestaurantOwner(id, restaurantOwner);
            if (!res) return c.text("Restaurant owner not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteRestaurantOwner(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const restaurantOwner = await this.restaurantOwnerService.getRestaurantOwnerById(id);
            if (!restaurantOwner) return c.text("Restaurant owner not found", 404);

            const res = await this.restaurantOwnerService.deleteRestaurantOwner(id);
            if (!res) return c.text("Restaurant owner not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getRestaurantOwnerByName(c: Context) {
        const name = c.req.param("name");
        if (typeof name !== "string") return c.text("Invalid name", 400);

        const restaurantOwner = await this.restaurantOwnerService.getRestaurantOwnerByName(name);
        if (!restaurantOwner) {
            return c.text("Restaurant owner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
}

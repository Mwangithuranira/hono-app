import { Context } from 'hono';
import { StatusCatalogService } from './status_catalog.service';

export class StatusCatalogController {
    constructor(private readonly statusCatalogService: StatusCatalogService) {}

    async getAllStatusCatalogs(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.statusCatalogService.getAllStatusCatalogs(limit);
            if (!data || data.length === 0) {
                return c.text("No status catalogs found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getStatusCatalogById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const statusCatalog = await this.statusCatalogService.getStatusCatalogById(id);
        if (!statusCatalog) {
            return c.text("Status catalog not found", 404);
        }
        return c.json(statusCatalog, 200);
    }

    async createStatusCatalog(c: Context) {
        try {
            const statusCatalog = await c.req.json();
            const createdStatusCatalog = await this.statusCatalogService.createStatusCatalog(statusCatalog);

            if (!createdStatusCatalog) return c.text("Status catalog not created", 404);
            return c.json({ msg: createdStatusCatalog }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateStatusCatalog(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const statusCatalog = await c.req.json();
        try {
            const searchedStatusCatalog = await this.statusCatalogService.getStatusCatalogById(id);
            if (!searchedStatusCatalog) return c.text("Status catalog not found", 404);

            const res = await this.statusCatalogService.updateStatusCatalog(id, statusCatalog);
            if (!res) return c.text("Status catalog not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteStatusCatalog(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const statusCatalog = await this.statusCatalogService.getStatusCatalogById(id);
            if (!statusCatalog) return c.text("Status catalog not found", 404);

            const res = await this.statusCatalogService.deleteStatusCatalog(id);
            if (!res) return c.text("Status catalog not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getStatusCatalogByName(c: Context) {
        const name = c.req.param("name");
        if (typeof name !== "string") return c.text("Invalid name", 400);

        const statusCatalog = await this.statusCatalogService.getStatusCatalogByName(name);
        if (!statusCatalog) {
            return c.text("Status catalog not found", 404);
        }
        return c.json(statusCatalog, 200);
    }
}

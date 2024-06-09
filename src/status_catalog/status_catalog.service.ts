import db from "../drizzle/db";
import { TIStatusCatalog, TSStatusCatalog, StatusCatalogTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class StatusCatalogService {
    async getAllStatusCatalogs(limit?: number): Promise<TSStatusCatalog[] | null> {
        if (limit) {
            return await db.query.StatusCatalogTable.findMany({
                limit: limit
            });
        }
        return await db.query.StatusCatalogTable.findMany();
    }

    async getStatusCatalogById(id: number): Promise<TIStatusCatalog | undefined> {
        return await db.query.StatusCatalogTable.findFirst({
            where: eq(StatusCatalogTable.id, id)
        });
    }

    async createStatusCatalog(statusCatalog: TIStatusCatalog) {
        await db.insert(StatusCatalogTable).values(statusCatalog);
        return "Status catalog created successfully";
    }

    async updateStatusCatalog(id: number, statusCatalog: TIStatusCatalog) {
        await db.update(StatusCatalogTable).set(statusCatalog).where(eq(StatusCatalogTable.id, id));
        return "Status catalog updated successfully";
    }

    async deleteStatusCatalog(id: number) {
        await db.delete(StatusCatalogTable).where(eq(StatusCatalogTable.id, id));
        return "Status catalog deleted successfully";
    }

    async getStatusCatalogByName(name: string): Promise<TIStatusCatalog | undefined> {
        return await db.query.StatusCatalogTable.findFirst({
            where: eq(StatusCatalogTable.name, name)
        });
    }
}

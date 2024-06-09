import db from "../drizzle/db";
import { TIState, TSState, StateTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class StateService {
    async getAllStates(limit?: number): Promise<TSState[] | null> {
        if (limit) {
            return await db.query.StateTable.findMany({
                limit: limit
            });
        }
        return await db.query.StateTable.findMany();
    }

    async getStateById(id: number): Promise<TIState | undefined> {
        return await db.query.StateTable.findFirst({
            where: eq(StateTable.id, id)
        });
    }

    async createState(state: TIState) {
        await db.insert(StateTable).values(state);
        return "State created successfully";
    }

    async updateState(id: number, state: TIState) {
        await db.update(StateTable).set(state).where(eq(StateTable.id, id));
        return "State updated successfully";
    }

    async deleteState(id: number) {
        await db.delete(StateTable).where(eq(StateTable.id, id));
        return "State deleted successfully";
    }

    async getStateByName(name: string): Promise<TIState | undefined> {
        return await db.query.StateTable.findFirst({
            where: eq(StateTable.name, name)
        });
    }
}


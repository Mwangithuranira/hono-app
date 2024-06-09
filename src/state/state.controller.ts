import { Context } from 'hono';
import { StateService } from './state.service';

export class StateController {
    constructor(private readonly stateService: StateService) {}

    async getAllStates(c: Context) {
        try {
            const limit = Number(c.req.query('limit'));
            const data = await this.stateService.getAllStates(limit);
            if (!data || data.length === 0) {
                return c.text("No states found", 404);
            }
            return c.json(data, 200);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getStateById(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const state = await this.stateService.getStateById(id);
        if (!state) {
            return c.text("State not found", 404);
        }
        return c.json(state, 200);
    }

    async createState(c: Context) {
        try {
            const state = await c.req.json();
            const createdState = await this.stateService.createState(state);

            if (!createdState) return c.text("State not created", 404);
            return c.json({ msg: createdState }, 201);

        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async updateState(c: Context) {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const state = await c.req.json();
        try {
            const searchedState = await this.stateService.getStateById(id);
            if (!searchedState) return c.text("State not found", 404);

            const res = await this.stateService.updateState(id, state);
            if (!res) return c.text("State not updated", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async deleteState(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        try {
            const state = await this.stateService.getStateById(id);
            if (!state) return c.text("State not found", 404);

            const res = await this.stateService.deleteState(id);
            if (!res) return c.text("State not deleted", 404);

            return c.json({ msg: res }, 201);
        } catch (error: any) {
            return c.json({ error: error?.message }, 400);
        }
    }

    async getStateByName(c: Context) {
        const name = c.req.param("name");
        if (typeof name !== "string") return c.text("Invalid name", 400);

        const state = await this.stateService.getStateByName(name);
        if (!state) {
            return c.text("State not found", 404);
        }
        return c.json(state, 200);
    }
}

// src/controllers/userController.ts
import { Context } from "hono";
import { usersService, getUserService, createUserService, updateUserService, deleteUserService, getUserByNameService } from "./user.service"; // Adjust the path as needed
import { isStringObject } from "util/types";

export const listUsers = async (c: Context) => {
    try {
        // Limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await usersService(limit);
        if (data == null || data.length === 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get user by ID
export const getUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserService(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};

// Create user
export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdUser = await createUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update user
export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        const searchedUser = await getUserService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);

        const res = await updateUserService(id, user);
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete user
export const deleteUser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const user = await getUserService(id);
        if (user == undefined) return c.text("User not found", 404);

        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get user by name
export const GetUser= async (c: Context) => {
    const name = c.req.param("name");
    if (!name) return c.text("Invalid name", 400);

    const user = await getUserByNameService(name);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};

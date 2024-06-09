import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUser, TSUser, UsersTable } from "../drizzle/schema";

export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.query.UsersTable.findMany({
            limit: limit
        });
    }
    return await db.query.UsersTable.findMany();
}

export const getUserService = async (id: number): Promise<TIUser | undefined> => {
    return await db.query.UsersTable.findFirst({
        where: eq(UsersTable.id, id)
    })
}


//get user by name
export const getUserByNameService = async (name: string): Promise<TIUser | undefined> => {
    return await db.query.UsersTable.findFirst({
        where: eq(UsersTable.name, name)
    })
}



export const createUserService = async (user: TIUser) => {
    await db.insert(UsersTable).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: TIUser) => {
    await db.update(UsersTable).set(user).where(eq(UsersTable.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(UsersTable).where(eq(UsersTable.id, id))
    return "User deleted successfully";
}

export const GetUserService = async (name:string): Promise<TIUser | undefined> => {
    return await db.query.UsersTable.findFirst({
        where: eq(UsersTable.name, name)
    })
}

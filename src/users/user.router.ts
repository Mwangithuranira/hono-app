import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser ,GetUser} from "./user.controller"
// import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id", getUser)
//search users by name
userRouter.get("/users/search/:name", GetUser)
//create a user
userRouter.post("/users", createUser)
//update a user
userRouter.put("/users/:id", updateUser)
//delete a user
userRouter.delete("/users/:id", deleteUser)

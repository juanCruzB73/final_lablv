import { Router } from "express";
import { registerUser, getUsers, getUsersById, updateUser, delUser, loginUser } from "../controllers/userController.js";

const userRoute=Router();

userRoute.get("/",getUsers)
userRoute.get("/:userId",getUsersById)
userRoute.post("/register",registerUser)
userRoute.put("/:userId",updateUser)
userRoute.delete("/:userId",delUser)
userRoute.post("/login",loginUser)

export default userRoute;
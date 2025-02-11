import { Router } from "express";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { GetUserList } from "../controllers/user";

export const UserRoute = Router()

UserRoute.get("/", Authorization([Role.ADMIN]), GetUserList)
import { Router } from "express";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { GetUserList } from "../controllers/user";
import { Register } from "../controllers/auth";

export const UserRoute = Router()

UserRoute.get("/", Authorization([Role.ADMIN]), GetUserList)
UserRoute.post("/", Authorization([Role.ADMIN]), Register)
UserRoute.patch("/password", Authorization([Role.ADMIN, Role.DOSEN]), )
UserRoute.patch("/info", Authorization([Role.ADMIN, Role.DOSEN]), )
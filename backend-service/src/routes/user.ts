import { Router } from "express";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { GetUserById, GetUserList, UpdatePassword } from "../controllers/user";
import { Register } from "../controllers/auth";

export const UserRoute = Router()

UserRoute.get("/", Authorization([Role.ADMIN]), GetUserList)
UserRoute.get("/:id", Authorization([Role.ADMIN, Role.DOSEN]), GetUserById)
UserRoute.post("/", Authorization([Role.ADMIN]), Register)
UserRoute.patch("/password", Authorization([Role.ADMIN, Role.DOSEN]), UpdatePassword)
UserRoute.patch("/info", Authorization([Role.ADMIN, Role.DOSEN]), )
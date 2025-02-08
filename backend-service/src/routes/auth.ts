import { Router } from "express";
import { Authentication, Me, Register } from "../controllers/auth";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";

export const AuthRoute = Router()

AuthRoute.post("/", Authentication)
AuthRoute.post("/register", Authorization([Role.ADMIN]), Register)
AuthRoute.get("/me", Authorization([Role.ADMIN, Role.DOSEN]), Me)
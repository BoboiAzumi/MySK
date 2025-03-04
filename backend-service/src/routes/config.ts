import { Router } from "express";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { GetConfig, SetConfig } from "../controllers/config";

export const ConfigRoute = Router()

ConfigRoute.get("/", Authorization([Role.ADMIN]), GetConfig)
ConfigRoute.patch("/", Authorization([Role.ADMIN]), SetConfig)
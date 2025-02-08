import { Router } from "express";
import { AuthRoute } from "./auth";
import { DocumentRouter } from "./document";

export const routes = Router()

routes.use("/auth", AuthRoute)
routes.use("/document", DocumentRouter)
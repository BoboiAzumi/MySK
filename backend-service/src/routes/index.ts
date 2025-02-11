import { Router } from "express";
import { AuthRoute } from "./auth";
import { DocumentRouter } from "./document";
import { UserRoute } from "./user";
import { FileRoute } from "./file";

export const routes = Router()

routes.use("/auth", AuthRoute)
routes.use("/document", DocumentRouter)
routes.use("/file", FileRoute)
routes.use("/user", UserRoute)
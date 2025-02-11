import { Router } from "express";
import { CountDocument, CreateNewDocument, DeleteDocument, GetDocument } from "../controllers/document";
import { Authorization } from "../middlewares/authorization";
import { Role } from "@prisma/client";

export const DocumentRouter = Router()

DocumentRouter.post("/", Authorization([Role.ADMIN, Role.DOSEN]), CreateNewDocument)
DocumentRouter.get("/", Authorization([Role.ADMIN, Role.DOSEN]), GetDocument)
DocumentRouter.get("/count", Authorization([Role.ADMIN, Role.DOSEN]), CountDocument)
DocumentRouter.delete("/", Authorization([Role.ADMIN, Role.DOSEN]), DeleteDocument)
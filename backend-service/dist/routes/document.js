"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRouter = void 0;
const express_1 = require("express");
const document_1 = require("../controllers/document");
const authorization_1 = require("../middlewares/authorization");
const client_1 = require("@prisma/client");
exports.DocumentRouter = (0, express_1.Router)();
exports.DocumentRouter.post("/", (0, authorization_1.Authorization)([client_1.Role.ADMIN, client_1.Role.DOSEN]), document_1.CreateNewDocument);
exports.DocumentRouter.get("/", (0, authorization_1.Authorization)([client_1.Role.ADMIN, client_1.Role.DOSEN]), document_1.GetDocument);
exports.DocumentRouter.get("/count", (0, authorization_1.Authorization)([client_1.Role.ADMIN, client_1.Role.DOSEN]), document_1.CountDocument);
exports.DocumentRouter.delete("/", (0, authorization_1.Authorization)([client_1.Role.ADMIN, client_1.Role.DOSEN]), document_1.DeleteDocument);

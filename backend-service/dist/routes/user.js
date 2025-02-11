"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const authorization_1 = require("../middlewares/authorization");
const client_1 = require("@prisma/client");
const user_1 = require("../controllers/user");
exports.UserRoute = (0, express_1.Router)();
exports.UserRoute.get("/", (0, authorization_1.Authorization)([client_1.Role.ADMIN]), user_1.GetUserList);

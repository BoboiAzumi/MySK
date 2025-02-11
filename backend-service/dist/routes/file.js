"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRoute = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const file_1 = require("../controllers/file");
const multer_2 = require("../utils/multer");
const is_file_available_1 = require("../middlewares/is-file-available");
const authorization_1 = require("../middlewares/authorization");
const client_1 = require("@prisma/client");
const upload = (0, multer_1.default)({
    storage: multer_2.diskStorage,
    fileFilter: multer_2.FileValidator
});
exports.FileRoute = (0, express_1.Router)();
exports.FileRoute.post('/', (0, authorization_1.Authorization)([client_1.Role.ADMIN, client_1.Role.DOSEN]), upload.single("file_docs"), is_file_available_1.isFileAvailable, file_1.FileUpload);

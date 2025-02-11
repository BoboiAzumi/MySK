"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = FileUpload;
const error_handler_1 = require("../utils/error-handler");
const path_1 = __importDefault(require("path"));
const file_1 = require("../services/file");
const fs_1 = require("fs");
function FileUpload(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const documentId = req.body.documentId;
            if (!documentId) {
                console.log("CATCH");
                (0, fs_1.unlinkSync)(`./public/files/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`);
                next(new error_handler_1.ErrorHandler(400, "BAD_REQUEST", "documentId not include in your request"));
                return;
            }
            const location = `/uploads/files/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}`;
            const type = path_1.default.extname((_c = req.file) === null || _c === void 0 ? void 0 : _c.filename).toLowerCase();
            const fileName = (_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname;
            const response = yield (0, file_1.StoreFileService)(location, type, fileName, parseInt(documentId));
            res.json(response);
            return;
        }
        catch (err) {
            (0, fs_1.unlinkSync)(`./public/files/${(_e = req.file) === null || _e === void 0 ? void 0 : _e.filename}`);
            if (err.name != "ErrorHandler") {
                next(new error_handler_1.ErrorHandler(400, "ERROR_REQUEST", err.message));
            }
            next(err);
        }
    });
}

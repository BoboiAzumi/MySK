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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewDocument = CreateNewDocument;
exports.GetDocument = GetDocument;
exports.DeleteDocument = DeleteDocument;
exports.CountDocument = CountDocument;
const error_handler_1 = require("../utils/error-handler");
const document_1 = require("../services/document");
const jwt_1 = require("../utils/jwt");
function CreateNewDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const parse = (0, jwt_1.jwtVerify)(token ? token : "");
            const { title, to } = req.body;
            const by = parse.id;
            if (parse.role != "ADMIN" && to != by) {
                console.log(`To ${to} && by ${by}`);
                next(new error_handler_1.ErrorHandler(403, "FORBIDDEN", "Couldn't upload to another user"));
                return;
            }
            const documentCreated = yield (0, document_1.CreateDocumentService)(title, by, to);
            res.json(documentCreated);
            return;
        }
        catch (err) {
            if (err.name != "ErrorHandler") {
                next(new error_handler_1.ErrorHandler(400, "ERROR_REQUEST", err.message));
            }
            next(err);
        }
    });
}
function GetDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { limit, page } = req.query;
            const token = (0, jwt_1.jwtVerify)((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
            const response = yield (0, document_1.GetDocumentService)(limit ? parseInt(limit) : 2, page ? parseInt(page) : 1, token.role, token.id);
            res.json(response);
            return;
        }
        catch (err) {
            if (err.name != "ErrorHandler") {
                next(new error_handler_1.ErrorHandler(400, "ERROR_REQUEST", err.message));
            }
            next(err);
        }
    });
}
function DeleteDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.body;
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const UserInfo = (0, jwt_1.jwtVerify)(token);
            if (UserInfo.role == "ADMIN") {
                res.json(yield (0, document_1.DeleteDocumentService)(id));
            }
            else {
                res.json(yield (0, document_1.DeleteDocumentByNonAdminService)(id, UserInfo.id));
            }
            return;
        }
        catch (err) {
            if (err.name != "ErrorHandler") {
                next(new error_handler_1.ErrorHandler(400, "ERROR_REQUEST", err.message));
            }
            next(err);
        }
    });
}
function CountDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, document_1.CountDocumentService)();
            res.json(response);
            return;
        }
        catch (err) {
            if (err.name != "ErrorHandler") {
                next(new error_handler_1.ErrorHandler(400, "ERROR_REQUEST", err.message));
            }
            next(err);
        }
    });
}

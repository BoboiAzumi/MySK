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
exports.CreateDocumentService = CreateDocumentService;
exports.GetDocumentService = GetDocumentService;
exports.DeleteDocumentService = DeleteDocumentService;
exports.DeleteDocumentByNonAdminService = DeleteDocumentByNonAdminService;
exports.CountDocumentService = CountDocumentService;
const client_1 = require("@prisma/client");
const document_1 = require("../repositories/document");
const response_builder_1 = require("../utils/response-builder");
const error_handler_1 = require("../utils/error-handler");
const fs_1 = require("fs");
const file_1 = require("../repositories/file");
function CreateDocumentService(title, by, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const newDocument = yield (0, document_1.createNewDocument)(title, by, to);
        return (0, response_builder_1.ResponseBuilder)(201, "CREATED", "Successfuly created new document", {
            id: newDocument.id
        });
    });
}
function GetDocumentService(limit, page, role, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const skip = limit * (page - 1 >= 0 ? page - 1 : 0);
        const take = limit;
        const documentCount = yield (0, document_1.countDocument)();
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Successfuly fetch document", {
            pagination: {
                totalItems: documentCount,
                previous: page <= 1 ? false : true,
                next: skip + take >= documentCount ? false : true
            },
            documents: role == client_1.Role.ADMIN ? yield (0, document_1.getAllDocument)(take, skip) : yield (0, document_1.getAllDocumentByTo)(take, skip, userId)
        });
    });
}
function DeleteDocumentService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = yield (0, document_1.findDocumentById)(id);
        if (!document) {
            throw new error_handler_1.ErrorHandler(404, "NOT_FOUND", "Document not found");
        }
        const fileIds = [];
        document.File.map((v) => {
            const filename = v.location.replace("/uploads", "./public");
            (0, fs_1.unlinkSync)(filename);
            fileIds.push(v.id);
        });
        yield (0, file_1.deleteFile)(fileIds);
        yield (0, document_1.deleteDocument)(id);
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Documents has been deleted", {});
    });
}
function DeleteDocumentByNonAdminService(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = yield (0, document_1.findDocumentById)(id);
        if (!document) {
            throw new error_handler_1.ErrorHandler(404, "NOT_FOUND", "Document not found");
        }
        if (document.ByUser.id == userId) {
            return yield DeleteDocumentService(id);
        }
        throw new error_handler_1.ErrorHandler(403, "FORBIDDEN", "Forbidden access for this document");
    });
}
function CountDocumentService() {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield (0, document_1.countDocument)();
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Document has been count", {
            count
        });
    });
}

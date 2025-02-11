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
exports.createNewDocument = createNewDocument;
exports.getAllDocument = getAllDocument;
exports.getAllDocumentByTo = getAllDocumentByTo;
exports.countDocument = countDocument;
exports.findDocumentById = findDocumentById;
exports.deleteDocument = deleteDocument;
const database_1 = require("../utils/database");
function createNewDocument(title, by, to) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.document.create({
            data: {
                title,
                by,
                to
            }
        });
    });
}
function getAllDocument(take, skip) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.document.findMany({
            take,
            skip,
            include: {
                File: true,
                ByUser: true,
                ToUser: true
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        });
    });
}
function getAllDocumentByTo(take, skip, to) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.document.findMany({
            take,
            skip,
            include: {
                File: true,
                ByUser: true,
                ToUser: true
            },
            where: {
                to
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        });
    });
}
function countDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.document.count();
    });
}
function findDocumentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.document.findFirst({
            where: {
                id
            },
            include: {
                File: true,
                ByUser: true
            }
        });
    });
}
function deleteDocument(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.document.delete({
            where: {
                id
            }
        });
    });
}

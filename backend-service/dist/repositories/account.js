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
exports.findByUsernameAndPassword = findByUsernameAndPassword;
exports.createAccount = createAccount;
exports.findByUsername = findByUsername;
const bcrypt_1 = require("../utils/bcrypt");
const database_1 = require("../utils/database");
function findByUsernameAndPassword(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.account.findFirst({
            where: {
                username,
                password
            },
            include: {
                UserInformation: true
            }
        });
    });
}
function createAccount(username, password, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.account.upsert({
            where: {
                userId,
            },
            update: {
                username,
                password: yield (0, bcrypt_1.hashPassword)(password),
            },
            create: {
                username,
                password: yield (0, bcrypt_1.hashPassword)(password),
                userId
            }
        });
    });
}
function findByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.account.findFirst({
            where: {
                username
            },
            include: {
                UserInformation: true
            }
        });
    });
}

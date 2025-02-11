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
exports.createUserInformation = createUserInformation;
exports.findUserById = findUserById;
exports.findAllUserByRole = findAllUserByRole;
exports.findAllUser = findAllUser;
const database_1 = require("../utils/database");
function createUserInformation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.userInformation.create({
            data: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                picture: user.picture,
                role: user.role
            }
        });
    });
}
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.userInformation.findFirst({
            where: {
                id
            }
        });
    });
}
function findAllUserByRole(role) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.userInformation.findMany({
            where: {
                role
            }
        });
    });
}
function findAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.prisma.userInformation.findMany();
    });
}

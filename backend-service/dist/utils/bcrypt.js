"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
function comparePassword(password, encryptedPassword) {
    return bcrypt_1.default.compare(password, encryptedPassword);
}
function hashPassword(plainTextPassword) {
    return bcrypt_1.default.hash(plainTextPassword, 10);
}

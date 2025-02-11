"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSign = jwtSign;
exports.jwtVerify = jwtVerify;
exports.jwtFileSign = jwtFileSign;
exports.jwtFileVerify = jwtFileVerify;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function jwtSign(information) {
    const token = jsonwebtoken_1.default.sign(information, process.env.JWT_SECRET || "MYSK", {
        algorithm: "HS256",
        expiresIn: "7d"
    });
    return token;
}
function jwtVerify(token) {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "MYSK");
    return decoded;
}
function jwtFileSign(fileInformation) {
    const token = jsonwebtoken_1.default.sign(fileInformation, process.env.JWT_SECRET || "MYSK", {
        algorithm: "HS256",
        expiresIn: "1d"
    });
    return token;
}
function jwtFileVerify(token) {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "MYSK");
    return decoded;
}

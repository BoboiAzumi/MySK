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
exports.Authorization = Authorization;
exports.FileAuthorization = FileAuthorization;
const jwt_1 = require("../utils/jwt");
const error_handler_1 = require("../utils/error-handler");
const user_information_1 = require("../repositories/user-information");
function Authorization(role) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers["authorization"];
                if (authHeader && authHeader.startsWith("Bearer ")) {
                    const token = authHeader.split(" ")[1];
                    const information = (0, jwt_1.jwtVerify)(token);
                    const user = yield (0, user_information_1.findUserById)(information.id);
                    if (role.includes(information.role) && user) {
                        next();
                        return;
                    }
                    next(new error_handler_1.ErrorHandler(403, "FORBIDDEN", "Can't access this endpoint"));
                    return;
                }
                next(new error_handler_1.ErrorHandler(403, "UNAUTHORIZED", "Can't access this endpoint"));
                return;
            }
            catch (err) {
                next(new error_handler_1.ErrorHandler(400, "INVALID_TOKEN", "Invalid Token"));
            }
        });
    };
}
function FileAuthorization(role) {
    return function (req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const path = req.url.toLowerCase().split("/");
                const fileType = path[path.length - 2];
                if (fileType === "img") {
                    next();
                    return;
                }
                const { token } = req.query;
                if (token) {
                    const fileInformation = (0, jwt_1.jwtFileVerify)(token);
                    if (role.includes(fileInformation.role)) {
                        next();
                        return;
                    }
                    next(new error_handler_1.ErrorHandler(403, "FORBIDDEN", "Can't access this endpoint"));
                    return;
                }
                next(new error_handler_1.ErrorHandler(403, "FORBIDDEN", "Can't access this endpoint"));
                return;
            }
            catch (err) {
                next(new error_handler_1.ErrorHandler(400, "INVALID_TOKEN", "Invalid Token"));
            }
        });
    };
}

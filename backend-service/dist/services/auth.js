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
exports.AuthenticationService = AuthenticationService;
exports.RegisterAccountService = RegisterAccountService;
exports.MeService = MeService;
const response_builder_1 = require("../utils/response-builder");
const jwt_1 = require("../utils/jwt");
const account_1 = require("../repositories/account");
const error_handler_1 = require("../utils/error-handler");
const user_information_1 = require("../repositories/user-information");
const bcrypt_1 = require("../utils/bcrypt");
function AuthenticationService(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, account_1.findByUsername)(username);
        if (!user) {
            throw new error_handler_1.ErrorHandler(404, "USER_NOT_FOUND", "Couldn't find user, please check your username again");
        }
        const validation = yield (0, bcrypt_1.comparePassword)(password, user.password);
        if (!validation) {
            throw new error_handler_1.ErrorHandler(401, "UNAUTHORIZED", "Wrong password");
        }
        const token = (0, jwt_1.jwtSign)({
            id: user.UserInformation.id,
            fullName: user.UserInformation.fullName,
            picture: user.UserInformation.picture,
            role: user.UserInformation.role
        });
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Sign in successfully", {
            token,
            information: (0, jwt_1.jwtVerify)(token)
        });
    });
}
function RegisterAccountService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const account = yield (0, account_1.findByUsername)(user.credential.username);
        if (account) {
            throw new error_handler_1.ErrorHandler(409, "USERNAME_FOUND", "Username already exists");
        }
        const userInfo = yield (0, user_information_1.createUserInformation)(user);
        yield (0, account_1.createAccount)(user.credential.username, user.credential.password, userInfo.id);
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Register new user successfuly", {});
    });
}
function MeService(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Success fetch user information", (0, jwt_1.jwtVerify)(token));
    });
}

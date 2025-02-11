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
exports.Authentication = Authentication;
exports.Register = Register;
exports.Me = Me;
const error_handler_1 = require("../utils/error-handler");
const auth_1 = require("../services/auth");
function Authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const response = yield (0, auth_1.AuthenticationService)(username, password);
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
function Register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const response = yield (0, auth_1.RegisterAccountService)(user);
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
function Me(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            const response = yield (0, auth_1.MeService)(token);
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

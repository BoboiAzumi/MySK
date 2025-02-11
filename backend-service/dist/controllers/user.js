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
exports.GetUserList = GetUserList;
const error_handler_1 = require("../utils/error-handler");
const user_1 = require("../services/user");
function GetUserList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { role } = req.query;
            if (role) {
                res.json(yield (0, user_1.GetUserService)(role));
                return;
            }
            res.json(yield (0, user_1.GetAllUserService)());
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

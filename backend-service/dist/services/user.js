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
exports.GetUserService = GetUserService;
exports.GetAllUserService = GetAllUserService;
const user_information_1 = require("../repositories/user-information");
const response_builder_1 = require("../utils/response-builder");
function GetUserService(role) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_information_1.findAllUserByRole)(role);
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Successfuly fetch all data", user);
    });
}
function GetAllUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_information_1.findAllUser)();
        return (0, response_builder_1.ResponseBuilder)(200, "SUCCESS", "Successfuly fetch all data", user);
    });
}

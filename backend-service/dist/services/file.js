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
exports.StoreFileService = StoreFileService;
const file_1 = require("../repositories/file");
const response_builder_1 = require("../utils/response-builder");
function StoreFileService(location, type, fileName, documentId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, file_1.storeFile)(location, type, fileName, documentId);
        return (0, response_builder_1.ResponseBuilder)(201, "CREATED", "Successfuly file uploads", {});
    });
}

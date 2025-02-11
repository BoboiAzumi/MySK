"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diskStorage = void 0;
exports.FileValidator = FileValidator;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const error_handler_1 = require("./error-handler");
exports.diskStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/files/");
    },
    filename: (req, file, callback) => {
        const ext = path_1.default.extname(file.originalname);
        callback(null, `${(0, uuid_1.v4)()}${ext}`);
    }
});
function FileValidator(req, file, callback) {
    const allowedTypes = /.pdf|.doc|.docx|.xls|.xlsx|.csv/;
    const extension = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    if (extension) {
        callback(null, true);
        return;
    }
    else {
        callback(new error_handler_1.ErrorHandler(400, "WRONG_FILE_EXTENSION", "Only allowed pdf, doc, docx, xls, xlsx, and csv"));
        return;
    }
}

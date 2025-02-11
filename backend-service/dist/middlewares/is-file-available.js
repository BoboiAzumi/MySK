"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileAvailable = isFileAvailable;
const error_handler_1 = require("../utils/error-handler");
function isFileAvailable(req, res, next) {
    if (!req.file) {
        next(new error_handler_1.ErrorHandler(400, "EMPTY_FILE", "File not include at request"));
        return;
    }
    next();
}

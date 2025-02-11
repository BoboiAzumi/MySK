"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, status, message) {
        super(message);
        this.name = "ErrorHandler";
        this.statusCode = statusCode;
        this.message = message;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorHandler = ErrorHandler;

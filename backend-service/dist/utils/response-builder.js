"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = ResponseBuilder;
function ResponseBuilder(statusCode, status, message, data) {
    return {
        meta: {
            statusCode,
            status,
            message
        },
        data
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadMiddleware = DownloadMiddleware;
function DownloadMiddleware(req, res, next) {
    res.setHeader("Content-Disposition", "attachment");
    next();
}

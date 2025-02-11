"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const error_handler_1 = require("./utils/error-handler");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const download_1 = require("./middlewares/download");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('/uploads', 
//FileAuthorization([Role.ADMIN, Role.DOSEN]),
download_1.DownloadMiddleware, express_1.default.static('public'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.routes);
app.all("*", (req, res, next) => {
    next(new error_handler_1.ErrorHandler(404, "NOT_FOUND", `Can't ${req.method} ${req.path}`));
});
const ErrorHandling = (err, _req, res, _next) => {
    if (err.name == "ErrorHandler") {
        res.status(err.statusCode);
        res.json({
            meta: {
                status: err.status,
                code: err.statusCode,
                message: err.message
            },
            data: []
        });
        console.log(`[${new Date().toISOString()}] Error : `);
        console.log(`\tURL        : ${_req.url}`);
        console.log(`\tMethod     : ${_req.method}`);
        console.log(`\tStatus     : ${err.status}`);
        console.log(`\tCode       : ${err.statusCode}`);
        console.log(`\tMessage    : ${err.message}`);
    }
    else {
        res.status(500);
        res.json({
            meta: {
                status: "INTERNAL_SERVER_ERROR",
                code: 500,
                message: err.message
            },
            data: []
        });
        console.log(`[${new Date().toISOString()}] Internal Server Error : `);
        console.log(`\tURL        : ${_req.url}`);
        console.log(`\tMethod     : ${_req.method}`);
        console.log(`\tStatus     : INTERNAL_SERVER_ERROR`);
        console.log(`\tCode       : 500`);
        console.log(`\tMessage    : ${err.message}`);
    }
};
app.use(ErrorHandling);
app.listen(process.env.PORT || 3000, () => console.log(`Service run at ${process.env.PORT || 3000}`));

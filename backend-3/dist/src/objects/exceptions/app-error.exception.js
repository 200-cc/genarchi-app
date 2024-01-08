"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
class AppError extends Error {
    constructor(args) {
        // Error constructor called
        super(args.description);
        this.isOperational = true;
        // Set http status code
        this.httpCode = args.httpCode;
        // Set is operational, mean the server can continue to run
        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
    GetPublicMessage() {
        switch (this.httpCode) {
            case HttpCode.BAD_REQUEST:
                return 'Bad Request';
            case HttpCode.INTERNAL_SERVER_ERROR:
                return 'Internal Server Error';
            case HttpCode.NO_CONTENT:
                return 'No Content';
            case HttpCode.NOT_FOUND:
                return 'Not Found';
            case HttpCode.UNAUTHORIZED:
                return 'Unauthorized';
            default:
                return 'Internal Server Error';
        }
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.exception.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_exception_1 = require("../objects/exceptions/app-error.exception");
const logger_middleware_1 = require("./logger.middleware");
const exit_middleware_1 = require("./exit.middleware");
function errorHandler(error, request, response, next) {
    // // Credentials are bad
    // if (error instanceof ExpiredTokenError) {
    //   const message = 'Credentials Expired';
    //   logger.error(`${request.method} ${request.url} - ${error.message}`);
    //   response.status(401).json({ message });
    // }
    // Credentials are not send
    // if (error instanceof UnauthorizedError) {
    //   const message = 'Requires authentication';
    //   logger.error(`${request.method} ${request.url} - ${message}`);
    //   response.status(error.status).json({ message });
    // }
    // AppError threw
    if (error instanceof app_error_exception_1.AppError) {
        // Log error, include private message
        logger_middleware_1.logger.error(`${request.method} ${request.url} - ${error.message}`);
        // Catch handle exception
        if (error.isOperational) {
            response.status(error.httpCode).json({
                // Public message, ex : "Bad Request"
                message: error.GetPublicMessage(),
                // If development server then include stack of error in response.data
                stack: process.env.NODE_ENV === 'development' ? error.stack : {},
            });
        }
        // Catch exception that cause a shutdown of the server
        else {
            response.status(app_error_exception_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                message: 'Internal server error',
                stack: process.env.NODE_ENV === 'development' ? error.stack : {},
            });
            logger_middleware_1.logger.fatal('Application encountered an untrusted error.');
            // Try a graceful shutdown, also promise ignore (not the state of the art)
            exit_middleware_1.exitHandler.exit(1);
        }
    }
    // Catch all errors that are not handle by the server
    else {
        logger_middleware_1.logger.error(`${request.method} ${request.url} - ${error.message}`);
        response.status(app_error_exception_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : {},
        });
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map
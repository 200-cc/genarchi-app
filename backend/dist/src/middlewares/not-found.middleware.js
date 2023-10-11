"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const logger_middleware_1 = require("./logger.middleware");
function notFoundHandler(request, response, next) {
    const message = 'Not Found';
    logger_middleware_1.logger.warn(`${request.method} ${request.url} - ${message}`);
    response.status(404).json({ message });
}
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=not-found.middleware.js.map
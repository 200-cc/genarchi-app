"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpTerminator = exports.index = void 0;
const http_1 = __importDefault(require("http"));
const http_terminator_1 = require("http-terminator");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./src/app"));
const logger_middleware_1 = require("./src/middlewares/logger.middleware");
// Use .env file
dotenv_1.default.config();
// Function to normalize the port from env
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
// Create port using env port or 3000 if null
const port = normalizePort(process.env.PORT || '3001');
// Set app port
app_1.default.set('port', port);
// Create http server
exports.index = http_1.default.createServer(app_1.default);
// Create httpTerminator for graceful shutdown
exports.httpTerminator = (0, http_terminator_1.createHttpTerminator)({
    server: exports.index,
});
// Create error handler function to make sure syscall did not fail
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = exports.index.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
    switch (error.code) {
        case 'EACCES':
            logger_middleware_1.logger.error(`${bind} requires elevated privileges.`);
            process.exit(1);
        case 'EADDRINUSE':
            logger_middleware_1.logger.error(`${bind} is already in use.`);
            process.exit(1);
        default:
            throw error;
    }
};
// Set server error handler function
exports.index.on('error', errorHandler);
// Set lambda function while starting to listen
exports.index.on('listening', () => {
    const address = exports.index.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
    logger_middleware_1.logger.info(`Listening on ${bind}`);
});
// Start server
exports.index.listen(port);
//# sourceMappingURL=index.js.map
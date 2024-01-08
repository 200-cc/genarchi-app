"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import swaggerJsdoc from "swagger-jsdoc" ;
// import swaggerUi from "swagger-ui-express" ;
// import swaggerFile from './swagger_output.json';
// Import middleware
const error_middleware_1 = require("./middlewares/error.middleware");
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const routes_1 = require("./routes");
const log4js_1 = __importDefault(require("log4js"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
// Create app using express
const app = (0, express_1.default)();
// Add logger
// app.use(logger('dev'));
app.use(log4js_1.default.connectLogger(logger_middleware_1.httpLogger, {
    level: 'auto',
    format: (req, res, format) => format(`:remote-addr - ":method :url HTTP/:http-version" :status :content-length ":user-agent" :response-time ms`),
}));
// Create generic header for response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://app.silveranana.com');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
// Set app to use json format
// app.use(bodyParser.json()); DEPRACATED express has now his own json parser
app.use(express_1.default.json()); // permet à l'API de répondre au format JSON
// Parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: false }));
// Allow cross domain
app.use((0, cors_1.default)());
// Set app routes
app.use('/', routes_1.router);
// Test route
app.get('/authorized', (req, res) => {
    res.send('Secured Resource');
});
// Use errorHandler to catch exception
app.use(error_middleware_1.errorHandler);
// Catch 404 and forward to error handler
app.use(not_found_middleware_1.notFoundHandler);
// Export app to be accessible in the server
// module.exports = app;
exports.default = app;
//# sourceMappingURL=app.js.map
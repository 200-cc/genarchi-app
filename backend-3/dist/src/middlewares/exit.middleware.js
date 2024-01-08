"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitHandler = void 0;
const index_1 = require("../../index");
const logger_middleware_1 = require("./logger.middleware");
class ExitHandler {
    exit(code, timeout = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_middleware_1.logger.error('Attempting graceful shutdown');
                setTimeout(() => {
                    process.exit(code);
                }, timeout).unref();
                if (index_1.index.listening) {
                    logger_middleware_1.logger.log('Terminating HTTP connections');
                    yield index_1.httpTerminator.terminate();
                }
                logger_middleware_1.logger.log(`Exiting gracefully with code ${code}`);
                process.exit(code);
            }
            catch (error) {
                logger_middleware_1.logger.error(`Error shutting down gracefully, forcing exit with code ${code}`);
                process.exit(code);
            }
        });
    }
}
exports.exitHandler = new ExitHandler();
//# sourceMappingURL=exit.middleware.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_middleware_1 = require("../middlewares/logger.middleware");
const quote_repository_1 = __importDefault(require("../repositories/quote.repository"));
function getQuote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`getQuote: ${id}`);
        const quote = yield quote_repository_1.default.getQuote(id);
        return quote;
    });
}
function getQuotes(skip, take) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`getQuotes: ${skip} ${take}`);
        const quotes = yield quote_repository_1.default.getQuotes(skip, take);
        return quotes;
    });
}
function postQuote(text, author) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`postQuote: ${text} ${author}`);
        const quote = yield quote_repository_1.default.postQuote(text, author);
        return quote;
    });
}
function patchQuote(id, text, author) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`patchQuote: ${id} ${text} ${author}`);
        const quote = yield quote_repository_1.default.patchQuote(id, text, author);
        return quote;
    });
}
function deleteQuote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`deleteQuote: ${id}`);
        return yield quote_repository_1.default.deleteQuote(id);
    });
}
exports.default = {
    getQuote,
    getQuotes,
    postQuote,
    patchQuote,
    deleteQuote
};
//# sourceMappingURL=quote.service.js.map
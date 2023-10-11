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
const quote_dto_1 = __importDefault(require("../objects/dto/quote.dto"));
require("express-async-errors");
const logger_middleware_1 = require("../middlewares/logger.middleware");
const quote_service_1 = __importDefault(require("../services/quote.service"));
function getQuote(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`getQuote: ${req.params.id}`);
        const quote = yield quote_service_1.default.getQuote(req.params.id);
        return res
            .status(200)
            .json(new quote_dto_1.default(quote.id, quote.text, quote.author, quote.likes));
    });
}
function getQuotes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`getQuotes: ${req.query.skip} ${req.query.take}`);
        const skip = Number(req.query.skip) > 0 ? Number(req.query.skip) : 0;
        const take = Number(req.query.take) > 0 ? Number(req.query.take) : 10;
        const quotes = yield quote_service_1.default.getQuotes(skip, take);
        // Here we use the automapper to increase the modularity of the code
        return res
            .status(200)
            .json(quotes.map((quote) => {
            return new quote_dto_1.default(quote.id, quote.text, quote.author, quote.likes);
        }));
    });
}
function postQuote(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`postQuote: ${req.body.text} ${req.body.author}`);
        const quote = yield quote_service_1.default.postQuote(req.body.text, req.body.author);
        return res
            .status(200)
            .json(new quote_dto_1.default(quote.id, quote.text, quote.author, quote.likes));
    });
}
function patchQuote(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`patchQuote: ${req.params.id} ${req.body.text} ${req.body.author}`);
        const quote = yield quote_service_1.default.patchQuote(req.params.id, req.body.text, req.body.author);
        return res
            .status(200)
            .json(new quote_dto_1.default(quote.id, quote.text, quote.author, quote.likes));
    });
}
function deleteQuote(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`deleteQuote: ${req.params.id}`);
        const quotes = yield quote_service_1.default.deleteQuote(req.params.id);
        // Here we use the automapper to increase the modularity of the code
        return res
            .status(200)
            .json(quotes.map((quote) => {
            return new quote_dto_1.default(quote.id, quote.text, quote.author, quote.likes);
        }));
    });
}
exports.default = {
    getQuote,
    getQuotes,
    postQuote,
    patchQuote,
    deleteQuote
};
//# sourceMappingURL=quote.controller.js.map
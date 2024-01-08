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
const app_error_exception_1 = require("../objects/exceptions/app-error.exception");
const quote_entity_1 = __importDefault(require("../objects/entities/quote.entity"));
const client_1 = require("@prisma/client");
const logger_middleware_1 = require("../middlewares/logger.middleware");
const prisma = new client_1.PrismaClient();
function getQuote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`getQuote: ${id}`);
        try {
            const quote = yield prisma.quote.findUnique({
                where: { id },
            });
            if (quote == null) {
                throw new app_error_exception_1.AppError({
                    httpCode: 404,
                    description: 'Quote not found',
                });
            }
            return new quote_entity_1.default(quote.id, quote.text, quote.author, quote.likes);
        }
        catch (error) {
            throw new app_error_exception_1.AppError({
                description: 'Get user failed',
                httpCode: 500,
            });
        }
    });
}
function getQuotes(skip, take) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`getQuotes: ${skip} ${take}`);
        try {
            const quotes = yield prisma.quote.findMany({
                skip,
                take,
                orderBy: {
                    likes: 'desc'
                }
            });
            if (quotes == null) {
                throw new app_error_exception_1.AppError({
                    httpCode: 500,
                    description: 'Internal error',
                });
            }
            const res = quotes.map((quote) => {
                return new quote_entity_1.default(quote.id, quote.text, quote.author, quote.likes);
            });
            return res;
        }
        catch (error) {
            if (error instanceof app_error_exception_1.AppError) {
                throw error;
            }
            else {
                throw new app_error_exception_1.AppError({
                    description: error.message,
                    httpCode: 500,
                });
            }
        }
    });
}
function postQuote(text, author) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`postQuote: ${text} ${author}`);
        try {
            const quote = yield prisma.quote.create({
                data: {
                    text,
                    author,
                    likes: 0
                }
            });
            return new quote_entity_1.default(quote.id, quote.text, quote.author, quote.likes);
        }
        catch (error) {
            throw new app_error_exception_1.AppError({
                description: 'Post quote failed',
                httpCode: 500,
            });
        }
    });
}
function patchQuote(id, text, author) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`patchQuote: ${id} ${text} ${author}`);
        try {
            const quote = yield prisma.quote.update({
                where: { id },
                data: {
                    text,
                    author
                }
            });
            return new quote_entity_1.default(quote.id, quote.text, quote.author, quote.likes);
        }
        catch (error) {
            throw new app_error_exception_1.AppError({
                description: 'Patch quote failed',
                httpCode: 500,
            });
        }
    });
}
function deleteQuote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`deleteQuote: ${id}`);
        try {
            yield prisma.quote.delete({
                where: { id },
            });
            const quotes = yield prisma.quote.findMany({
                skip: 0,
                take: 10,
                orderBy: {
                    likes: 'desc'
                }
            });
            if (quotes == null) {
                throw new app_error_exception_1.AppError({
                    httpCode: 404,
                    description: 'Quote not found',
                });
            }
            const res = quotes.map((quote) => {
                return new quote_entity_1.default(quote.id, quote.text, quote.author, quote.likes);
            });
            return res;
        }
        catch (error) {
            throw new app_error_exception_1.AppError({
                description: 'Delete quote failed',
                httpCode: 500,
            });
        }
    });
}
function likeQuote(id) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_middleware_1.logger.debug(`likeQuote: ${id}`);
        try {
            const quote = yield prisma.quote.update({
                where: { id },
                data: {
                    likes: {
                        increment: 1
                    }
                }
            });
            return new quote_entity_1.default(quote.id, quote.text, quote.author, quote.likes);
        }
        catch (error) {
            throw new app_error_exception_1.AppError({
                description: 'Like quote failed',
                httpCode: 500,
            });
        }
    });
}
exports.default = {
    getQuote,
    getQuotes,
    postQuote,
    patchQuote,
    deleteQuote,
    likeQuote
};
//# sourceMappingURL=quote.repository.js.map
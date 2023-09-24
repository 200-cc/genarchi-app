import { AppError, HttpCode } from '../objects/exceptions/app-error.exception';
import { logger } from '../middlewares/logger.middleware';
import QuoteEntity from "../objects/entities/quote.entity";
import QuoteRepository from "../repositories/quote.repository";

async function getQuote(id: number) {
    const quote: QuoteEntity = await QuoteRepository.getQuote(id);
    return quote;
}

async function getQuotes(skip: number, take: number) {
    const quotes = await QuoteRepository.getQuotes(skip, take)
    return quotes;
}

export default {
    getQuote,
    getQuotes
};
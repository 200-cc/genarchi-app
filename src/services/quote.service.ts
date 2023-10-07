import { AppError, HttpCode } from '../objects/exceptions/app-error.exception';
import { logger } from '../middlewares/logger.middleware';
import QuoteEntity from "../objects/entities/quote.entity";
import QuoteRepository from "../repositories/quote.repository";

async function getQuote(id: string) {
    logger.debug(`getQuote: ${id}`)
    const quote: QuoteEntity = await QuoteRepository.getQuote(id);
    return quote;
}

async function getQuotes(skip: number, take: number) {
    logger.debug(`getQuotes: ${skip} ${take}`)
    const quotes = await QuoteRepository.getQuotes(skip, take)
    return quotes;
}

async function postQuote(text: string, author: string) {
    logger.debug(`postQuote: ${text} ${author}`)
    const quote: QuoteEntity = await QuoteRepository.postQuote(text, author);
    return quote;
}

async function patchQuote(id: string, text: string, author: string) {
    logger.debug(`patchQuote: ${id} ${text} ${author}`)
    const quote: QuoteEntity = await QuoteRepository.patchQuote(id, text, author);
    return quote;
}

export default {
    getQuote,
    getQuotes,
    postQuote,
    patchQuote
};
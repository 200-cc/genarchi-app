import {logger} from '../middlewares/logger.middleware';
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

async function deleteQuote(id: string) {
    logger.debug(`deleteQuote: ${id}`)
    return await QuoteRepository.deleteQuote(id);
}

async function likeQuote(id: string) {
    logger.debug(`likeQuote: ${id}`)
    return await QuoteRepository.likeQuote(id);
}

export default {
    getQuote,
    getQuotes,
    postQuote,
    patchQuote,
    deleteQuote,
    likeQuote
};
import QuoteDto from "../objects/dto/quote.dto";
import QuoteEntity from "../objects/entities/quote.entity";

import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { AppError, HttpCode } from '../objects/exceptions/app-error.exception';
import { logger } from '../middlewares/logger.middleware';

import QuoteService from "../services/quote.service";


async function getQuote(req: Request, res: Response, next: NextFunction) {
    const quote: QuoteEntity = await QuoteService.getQuote(req.params.id);
    return res
        .status(200)
        .json(
            new QuoteDto(
                quote.id,
                quote.text,
                quote.author,
                quote.likes
            )
        );
}

async function getQuotes(req: Request, res: Response, next: NextFunction) {
    const skip = Number(req.query.skip) > 0  ? Number(req.query.skip) : 0
    const take = Number(req.query.take) > 0  ? Number(req.query.take) : 10
    const quotes = await QuoteService.getQuotes(skip, take);

    // Here we use the automapper to increase the modularity of the code
    return res
        .status(200)
        .json(quotes.map( (quote): QuoteDto => {
            return new QuoteDto(
                quote.id,
                quote.text,
                quote.author,
                quote.likes
            )})
        );
}

export default {
    getQuote,
    getQuotes
};
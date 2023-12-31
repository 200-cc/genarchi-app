import {AppError} from '../objects/exceptions/app-error.exception';
import QuoteEntity from "../objects/entities/quote.entity";
import {PrismaClient} from '@prisma/client';
import {logger} from "../middlewares/logger.middleware";

const prisma = new PrismaClient();
async function getQuote(id: string) {
    logger.debug(`getQuote: ${id}`)
    try {
        const quote = await prisma.quote.findUnique({
            where: { id },
        });
        if (quote == null) {
            throw new AppError({
                httpCode: 404,
                description: 'Quote not found',
            });
        }
        return new QuoteEntity(
            quote.id,
            quote.text,
            quote.author,
            quote.likes
        );

    } catch (error)
    {
        throw new AppError({
            description: 'Get user failed',
            httpCode: 500,
        });
    }
}

async function getQuotes(skip: number, take: number) {
    logger.debug(`getQuotes: ${skip} ${take}`)
    try {
        const quotes = await prisma.quote.findMany({
            skip,
            take,
            orderBy: {
                    likes: 'desc'
                }
        });
        if (quotes == null) {
            throw new AppError({
                httpCode: 500,
                description: 'Internal error',
            });
        }
        const res =  quotes.map((quote): QuoteEntity => {
            return new QuoteEntity(
                quote.id,
                quote.text,
                quote.author,
                quote.likes
            );});
        return res;
    } catch (error)
    {
        if (error instanceof AppError) {
            throw error;
        }
        else {
            throw new AppError({
                description: error.message,
                httpCode: 500,
            });
        }
    }
}

async function postQuote(text: string, author: string) {
    logger.debug(`postQuote: ${text} ${author}`)
    try {
        const quote = await prisma.quote.create({
            data: {
                text,
                author,
                likes: 0
            }
        });
        return new QuoteEntity(
            quote.id,
            quote.text,
            quote.author,
            quote.likes
        );
    } catch (error)
    {
        throw new AppError({
            description: 'Post quote failed',
            httpCode: 500,
        });
    }
}

async function patchQuote(id: string, text: string, author: string) {
    logger.debug(`patchQuote: ${id} ${text} ${author}`)
    try {
        const quote = await prisma.quote.update({
            where: { id },
            data: {
                text,
                author
            }
        });
        return new QuoteEntity(
            quote.id,
            quote.text,
            quote.author,
            quote.likes
        );
    } catch (error)
    {
        throw new AppError({
            description: 'Patch quote failed',
            httpCode: 500,
        });
    }
}

async function deleteQuote(id: string) {
    logger.debug(`deleteQuote: ${id}`)
    try {
        await prisma.quote.delete({
            where: { id },
        });
        const quotes = await prisma.quote.findMany({
            skip: 0,
            take: 10,
            orderBy: {
                likes: 'desc'
            }
        });
        if (quotes == null) {
            throw new AppError({
                httpCode: 404,
                description: 'Quote not found',
            });
        }
        const res =  quotes.map((quote): QuoteEntity => {
            return new QuoteEntity(
                quote.id,
                quote.text,
                quote.author,
                quote.likes
            );});
        return res;
    } catch (error)
    {
        throw new AppError({
            description: 'Delete quote failed',
            httpCode: 500,
        });
    }
}

async function likeQuote(id: string) {
    logger.debug(`likeQuote: ${id}`)
    try {
        const quote = await prisma.quote.update({
            where: { id },
            data: {
                likes: {
                    increment: 1
                }
            }
        });
        return new QuoteEntity(
            quote.id,
            quote.text,
            quote.author,
            quote.likes
        );
    } catch (error)
    {
        throw new AppError({
            description: 'Like quote failed',
            httpCode: 500,
        });
    }
}

export default {
    getQuote,
    getQuotes,
    postQuote,
    patchQuote,
    deleteQuote,
    likeQuote
};
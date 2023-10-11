import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from '../objects/exceptions/app-error.exception';
import { logger } from './logger.middleware';
import { exitHandler } from './exit.middleware';

export function errorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // // Credentials are bad
  // if (error instanceof ExpiredTokenError) {
  //   const message = 'Credentials Expired';
  //   logger.error(`${request.method} ${request.url} - ${error.message}`);
  //   response.status(401).json({ message });
  // }

  // Credentials are not send
  // if (error instanceof UnauthorizedError) {
  //   const message = 'Requires authentication';
  //   logger.error(`${request.method} ${request.url} - ${message}`);
  //   response.status(error.status).json({ message });
  // }

  // AppError threw
  if (error instanceof AppError) {
    // Log error, include private message
    logger.error(`${request.method} ${request.url} - ${error.message}`);

    // Catch handle exception
    if (error.isOperational) {
      response.status(error.httpCode).json({
        // Public message, ex : "Bad Request"
        message: error.GetPublicMessage(),
        // If development server then include stack of error in response.data
        stack: process.env.NODE_ENV === 'development' ? error.stack : {},
      });
    }

    // Catch exception that cause a shutdown of the server
    else {
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : {},
      });
      logger.fatal('Application encountered an untrusted error.');
      // Try a graceful shutdown, also promise ignore (not the state of the art)
      exitHandler.exit(1);
    }
  }

  // Catch all errors that are not handle by the server
  else {
    logger.error(`${request.method} ${request.url} - ${error.message}`);
    response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : {},
    });
  }
}

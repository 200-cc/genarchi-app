import {NextFunction, Request, Response} from "express";
import {logger} from "./logger.middleware";

export function notFoundHandler(request: Request,
                                response: Response,
                                next: NextFunction)
{
  const message = 'Not Found';
  logger.warn(`${request.method} ${request.url} - ${message}`);
  response.status(404).json({ message });
}

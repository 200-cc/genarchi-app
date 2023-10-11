export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  httpCode: HttpCode;
  description: string;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly httpCode: HttpCode;

  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    // Error constructor called
    super(args.description);
    // Set http status code
    this.httpCode = args.httpCode;
    // Set is operational, mean the server can continue to run
    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  GetPublicMessage(): string {
    switch (this.httpCode) {
      case HttpCode.BAD_REQUEST:
        return 'Bad Request';

      case HttpCode.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';

      case HttpCode.NO_CONTENT:
        return 'No Content';

      case HttpCode.NOT_FOUND:
        return 'Not Found';

      case HttpCode.UNAUTHORIZED:
        return 'Unauthorized';

      default:
        return 'Internal Server Error';
    }
  }
}

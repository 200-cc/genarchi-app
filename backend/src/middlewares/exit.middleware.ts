import { httpTerminator, index } from '../../index';
import { logger } from './logger.middleware';

class ExitHandler {
  public async exit(code: number, timeout = 5000): Promise<void> {
    try {
      logger.error('Attempting graceful shutdown');

      setTimeout(() => {
        process.exit(code);
      }, timeout).unref();

      if (index.listening) {
        logger.log('Terminating HTTP connections');
        await httpTerminator.terminate();
      }
      logger.log(`Exiting gracefully with code ${code}`);
      process.exit(code);
    } catch (error) {
      logger.error(
        `Error shutting down gracefully, forcing exit with code ${code}`
      );
      process.exit(code);
    }
  }
}

export const exitHandler = new ExitHandler();

import http from 'http';
import { createHttpTerminator } from 'http-terminator';
import dotenv from 'dotenv';
import app from './src/app';
import { logger } from './src/middlewares/logger.middleware';

// Use .env file
dotenv.config();

// Function to normalize the port from env
const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Create port using env port or 3000 if null
const port = normalizePort(process.env.PORT || '3001');

// Set app port
app.set('port', port);

// Create http server
export const index = http.createServer(app);

// Create httpTerminator for graceful shutdown
export const httpTerminator = createHttpTerminator({
  server: index,
});

// Create error handler function to make sure syscall did not fail
const errorHandler = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = index.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
};

// Set server error handler function
index.on('error', errorHandler);

// Set lambda function while starting to listen
index.on('listening', () => {
  const address = index.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  logger.info(`Listening on ${bind}`);
});

// Start server
index.listen(port);

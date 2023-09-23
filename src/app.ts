import express from 'express';
import cors from 'cors';
// import swaggerJsdoc from "swagger-jsdoc" ;
// import swaggerUi from "swagger-ui-express" ;
// import swaggerFile from './swagger_output.json';

// Import middleware
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { router } from './routes';
import log4js from 'log4js';
import { httpLogger } from './middlewares/logger.middleware';

// Create app using express
const app = express();

// Add logger
// app.use(logger('dev'));
app.use(
  log4js.connectLogger(httpLogger, {
    level: 'auto',
    format: (req, res, format) =>
      format(
        `:remote-addr - ":method :url HTTP/:http-version" :status :content-length ":user-agent" :response-time ms`
      ),
  })
);

// Create generic header for response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://app.silveranana.com');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Set app to use json format
// app.use(bodyParser.json()); DEPRACATED express has now his own json parser
app.use(express.json()); // permet à l'API de répondre au format JSON

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Allow cross domain
app.use(cors());

// Set app routes
app.use('/', router);

// Test route
app.get('/authorized', (req, res) => {
  res.send('Secured Resource');
});

// Use errorHandler to catch exception
app.use(errorHandler);

// Catch 404 and forward to error handler
app.use(notFoundHandler);

// Export app to be accessible in the server
// module.exports = app;
export default app;

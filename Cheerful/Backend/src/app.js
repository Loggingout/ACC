// app.js — Express app: middleware pipeline + route mounting
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('./config/env');
const httpLogger = require('./config/logger');
const apiRouter = require('./api');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      // allow non-browser requests (no Origin header, e.g. curl/health checks)
      if (!origin || env.clientOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(httpLogger);

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

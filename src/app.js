const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/boards.router');
const { logger, errorHandler } = require('./common/logger');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const morgan = require('morgan');
const { createWriteStream } = require('fs');
const exit = process.exit;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

morgan.token('query', req => {
  return JSON.stringify(req.query);
});

const infoLog = path.join(__dirname, './logs/info.log');

app.use(
  morgan(JSON.stringify('{url: :url, query: :query, body: :body}'), {
    stream: createWriteStream(infoLog)
  })
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

app.use((err, req, res, next) => {
  errorHandler(err, res);
  next();
});

process.on('uncaughtException', error => {
  logger.error({ status: INTERNAL_SERVER_ERROR, message: error.message });
  exit(1);
});
process.on('unhandledRejection', reason => {
  logger.error({
    status: INTERNAL_SERVER_ERROR,
    message: reason.message
  });
});

module.exports = app;

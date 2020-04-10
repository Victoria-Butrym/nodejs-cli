/* eslint-disable callback-return */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/boards.router');
const tasksRouter = require('./resources/tasks/task.router');
const { finished } = require('stream');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('*', (req, res, next) => {
  const { method, url, body, query } = req;
  // eslint-disable-next-line callback-return
  next();
  finished(res, () => {
    const { statusCode } = res;
    const log = {
      statusCode,
      method,
      url,
      body,
      params: query
    };
    logger.log({
      level: 'info',
      message: log
    });
  });
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boards/:boardId/tasks', tasksRouter);

module.exports = app;

const { createLogger, format, transports } = require('winston');
const path = require('path');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const errorLog = path.join(__dirname, '../logs/error.log');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: errorLog,
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

const requestHandler = async req => {
  const { query, body, url } = await req;
  const message = { url, query, body };
  logger.info(JSON.stringify(message));
};

class ErrorHandler extends Error {
  constructor(statusCode, message = getStatusText(statusCode)) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

function errorHandler(err, res) {
  console.log('ERROR:  ', err);
  const { statusCode, message } = err;

  const errorLogg = {
    status: 'error',
    statusCode,
    message
  };
  logger.error(errorLogg);

  if (statusCode) {
    res.status(statusCode).json(errorLogg);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
}

module.exports = { logger, requestHandler, ErrorHandler, errorHandler };

const { createLogger, format, transports } = require('winston');
const path = require('path');

// const infoLog = path.join(__dirname, '../logs/info.log');
const errorLog = path.join(__dirname, '../logs/error.log');

const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: errorLog,
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    })
    // new transports.File({
    //   filename: infoLog,
    //   level: 'info',
    //   format: format.combine(format.uncolorize(), format.prettyPrint())
    // })
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
  logger.error(err);
  const { statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
}

module.exports = { logger, requestHandler, ErrorHandler, errorHandler };

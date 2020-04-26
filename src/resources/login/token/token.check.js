// const JWT = require('jsonwebtoken');
const loginService = require('../login.service');
// const { ErrorHandler } = require('../../../common/logger');
// const chalk = require('chalk');
const HttpStatus = require('http-status-codes');
// const JWT = require('jsonwebtoken');
// const { JWT_SECRET_KEY } = require('../../../common/config');

const tokenCheck = (req, res, next) => {
  const accessToken = req.headers['x-acces-token'] || req.headers.authorization;

  if (!accessToken || !accessToken.startsWith('Bearer ')) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send('Access token is missing or invalid')
      .end();
  }

  const token = accessToken.split(' ')[1];
  // console.log(chalk.red('@@@@@@@@@'), token);

  // JWT.verify(token, JWT_SECRET_KEY, (err, decoded) => {
  //   if (err) {
  //     return res
  //       .status(HttpStatus.UNAUTHORIZED)
  //       .send('Access token is missing or invalid')
  //       .end();
  //   }
  //   req.decoded = decoded;
  //   next();
  // });

  // if (token) {
  //   try {
  //     JWT.verify(token, JWT_SECRET_KEY);
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }

  const verified = loginService.checkLogin(token);
  if (!verified) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send('Access token is missing or invalid')
      .end();
  }

  // console.log('auth-header:====', accessToken);

  next();
};

module.exports = tokenCheck;

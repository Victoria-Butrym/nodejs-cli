const JWT = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { getUserByLogin } = require('../users/user.db.repository');
const { ErrorHandler } = require('../../common/logger');
const HttpsStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
// const chalk = require('chalk');

const logIn = async userData => {
  const user = await getUserByLogin(userData.login);
  console.log('USER: ', user);

  if (!user) {
    return false;
  }

  const res = await bcrypt.compare(userData.password, user.password);
  if (!res) {
    console.log('NAH');
    throw new ErrorHandler(HttpsStatus.NOT_FOUND, 'USER-NOT-FOUND');
  }
  // console.log('USER-PASSWORD: ', userData.password);
  const token = JWT.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);
  // console.log(chalk.green('TOKEN: '), token);
  return token;
};

const checkLogin = token => {
  if (!token) {
    console.log('UNDEFINED TOKEN!!!!!!!!!!!');
  }
  // if (token) {
  //   jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       return res
  //         .status(HttpStatus.UNAUTHORIZED)
  //         .send('Access token is missing or invalid')
  //         .end();
  //     }
  //     req.decoded = decoded;
  //     next();
  //   });
  // }
  // const verified = JWT.verify(token, JWT_SECRET_KEY);

  // if (!verified) {
  //   throw new ErrorHandler(HttpsStatus.UNAUTHORIZED, 'Unauthorized');
  // }
  // return true;
  try {
    // console.log('TOKEN=== ', token);
    // if (token === 'undefined') {
    //   console.log(
    //     'UNDEFINED--------------------------------------------------------------'
    //   );
    //   return false;
    // }
    JWT.verify(token, JWT_SECRET_KEY);
    // console.log('===verified', JWT.verify(token, JWT_SECRET_KEY));
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { logIn, checkLogin };

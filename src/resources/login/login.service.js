const JWT = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { getUserByLogin } = require('../users/user.db.repository');
const { ErrorHandler } = require('../../common/logger');
const HttpsStatus = require('http-status-codes');
const bcrypt = require('bcrypt');

const logIn = async userData => {
  const user = await getUserByLogin(userData.login);
  if (!user) {
    return false;
  }

  const res = await bcrypt.compare(userData.password, user.password);
  if (!res) {
    throw new ErrorHandler(HttpsStatus.NOT_FOUND, 'USER-NOT-FOUND');
  }
  const token = JWT.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY);
  return token;
};

const checkLogin = token => {
  try {
    JWT.verify(token, JWT_SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { logIn, checkLogin };

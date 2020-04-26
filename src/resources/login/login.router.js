const loginService = require('./login.service');
const router = require('express').Router();
const { ErrorHandler } = require('../../common/logger');
const HttpStatus = require('http-status-codes');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.logIn(req.body);
    if (!token) {
      throw new ErrorHandler(HttpStatus.FORBIDDEN);
    }
    return res.status(HttpStatus.OK).send({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

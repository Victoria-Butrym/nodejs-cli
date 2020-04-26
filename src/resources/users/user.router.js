const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/logger');
const { BAD_REQUEST, NOT_FOUND, OK } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    if (!users) {
      throw new ErrorHandler(NOT_FOUND, 'USERS_NOT_FOUND');
    }
    res.json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUser(id);
    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 'USER_NOT_FOUND');
    }

    return res.status(OK).json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const userData = req.body;
    if (Object.keys(userData).length === 0) {
      throw new ErrorHandler(BAD_REQUEST);
    }

    const newUser = await usersService.createUser(userData);
    if (!newUser) {
      throw new ErrorHandler(NOT_FOUND, 'USER_NOT_FOUND');
    }
    return res.status(OK).json(User.toResponse(newUser));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    if (Object.keys(userData).length === 0) {
      throw new ErrorHandler(BAD_REQUEST);
    }

    const user = await usersService.updateUser(id, userData);
    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 'USER_NOT_FOUND');
    }
    return res.status(OK).json(user);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersService.deleteUser(id);
    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 'USER_NOT_FOUND');
    }
    return res.status(OK).json(user);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

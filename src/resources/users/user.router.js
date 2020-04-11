const router = require('express').Router();
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/logger');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const { code, body } = await usersService.getAll();
    if (!body.length) {
      throw new ErrorHandler(BAD_REQUEST);
    }
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;

    const { code, body } = await usersService.getUserByID(id);
    if (!body) {
      throw new ErrorHandler(NOT_FOUND, 'USER_NOT_FOUND');
    }
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const userInfo = req.body;

    const { code, body } = await usersService.createUser(userInfo);
    if (!body) {
      throw new ErrorHandler(BAD_REQUEST);
    }
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

// router.route('/:id').delete(async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     if (!id || id === 'undefined') throw new ErrorHandler(NOT_FOUND);

//     const { code, body } = await usersService.deleteUser(id);
//     if (!body) throw new ErrorHandler(NOT_FOUND);
//     return res.status(code).json(body);
//   } catch (error) {
//     return next(error);
//   }
// });

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const userInfo = req.body;

    if (!userInfo) throw new ErrorHandler(BAD_REQUEST);

    const { code, body } = await usersService.updateUserInfo(id, userInfo);
    if (!body) throw new ErrorHandler(NOT_FOUND, 'User not found');
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;

    const { code, body } = await usersService.deleteUser(id);
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

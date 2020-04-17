const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/logger');
const { BAD_REQUEST } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const responesData = await usersService.getUser(id);
    return res
      .status(responesData.code)
      .json(User.toResponse(responesData.body));
  } catch (error) {
    return res.status(520).json(error.message);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const userData = req.body;
    // console.log('USERDATA', userData);

    const newUser = await usersService.createUser(userData);
    if (!newUser) {
      throw new ErrorHandler(BAD_REQUEST);
    }
    // console.log('ROUTER', newUser);
    return res.status(newUser.code).json(User.toResponse(newUser.body));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  const { code, body } = await usersService.updateUser(id, userData);
  return res.status(code).json(body);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const { code, body } = await usersService.deleteUser(id);
  return res.status(code).json(body);
});

module.exports = router;

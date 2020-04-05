const router = require('express').Router();
// const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const { code, body } = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  // res.json(users.map(User.toResponse));
  return res.status(code).json(body);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  const { code, body } = await usersService.getUserByID(id);
  return res.status(code).json(body);
});

router.route('/').post(async (req, res) => {
  const userInfo = req.body;

  const { code, body } = await usersService.createUser(userInfo);
  return res.status(code).json(body);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;

  const { code, body } = await usersService.deleteUser(id);
  return res.status(code).json(body);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  const { code, body } = await usersService.updateUserInfo(id, userInfo);
  return res.status(code).json(body);
});

module.exports = router;

const router = require('express').Router();
// const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  // res.json(users.map(User.toResponse));
  return res.status(users.code).json(users.body);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  const user = await usersService.getUserByID(id);
  return res.status(user.code).json(user.body);
});

router.route('/').post(async (req, res) => {
  const userInfo = req.body;
  const newUser = await usersService.createUser(userInfo);
  return res.status(newUser.code).json(newUser.body);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;

  const remainUsers = await usersService.deleteUser(id);
  return res.status(remainUsers.code).json(remainUsers.body);
});

module.exports = router;

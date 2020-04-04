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

module.exports = router;

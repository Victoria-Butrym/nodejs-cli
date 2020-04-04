const router = require('express').Router();
// const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  // res.json(users.map(User.toResponse));
  return res.status(users.code).json(users.body);
});

module.exports = router;

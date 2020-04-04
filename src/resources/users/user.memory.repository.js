const User = require('./user.model.js');

const users = [
  new User({ name: 'name1', login: 'login1', password: 'password1' })
];

const getAll = async () => {
  // // TODO: mock implementation. should be replaced during task development
  // return [];
  return users.map(user => User.toResponse(user));
  // console.log(users);
};

module.exports = { getAll };

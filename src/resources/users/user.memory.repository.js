const User = require('./user.model.js');

const users = [
  new User({ name: 'name1', login: 'login1', password: 'password1' }),
  new User({ name: 'name2', login: 'login2', password: 'password2' })
];

const getAll = async () => {
  // // TODO: mock implementation. should be replaced during task development
  // return [];
  return users.map(user => User.toResponse(user));
  // console.log(users);
};

const getUserByID = async id => {
  return users.find(user => user.id === id);
};

const createUser = async userInfo => {
  const newUser = new User(userInfo);
  users.push(newUser);
  return User.toResponse(newUser);
};

const deleteUser = async id => {
  return users.filter(user => user.id !== id);
};

module.exports = { getAll, getUserByID, createUser, deleteUser };

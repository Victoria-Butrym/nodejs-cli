const User = require('./user.model.js');

const USERS = [
  new User({ name: 'name1', login: 'login1', password: 'password1' }),
  new User({ name: 'name2', login: 'login2', password: 'password2' })
];

const getAll = async () => {
  return USERS.map(user => User.toResponse(user));
};

const getUserByID = async id => {
  return USERS.find(user => user.id === id);
};

const createUser = async userInfo => {
  const newUser = new User(userInfo);
  USERS.push(newUser);
  return User.toResponse(newUser);
};

const deleteUser = async id => {
  return USERS.filter(user => user.id !== id);
};

const updateUserInfo = async (id, userInfo) => {
  const { name, login, password } = userInfo;
  const userIndex = USERS.findIndex(user => user.id === id);

  const updatedUser = new User({ id, name, login, password });
  USERS[userIndex] = updatedUser;

  return User.toResponse(updatedUser);
};

module.exports = {
  getAll,
  getUserByID,
  createUser,
  deleteUser,
  updateUserInfo
};

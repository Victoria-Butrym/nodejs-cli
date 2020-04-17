const User = require('./user.model');
// const taskRepo = require('../tasks/task.memory.repository');

// const USERS = [
//   new User({ name: 'name1', login: 'login1', password: 'password1' }),
//   new User({ name: 'name2', login: 'login2', password: 'password2' })
// ];

const getAll = async () => {
  return User.find({});
  // throw new Error('DB ERROR');
  // return USERS;
};

const getUser = async id => {
  return User.findById(id);
  // throw new Error('DB ERROR');
  // return USERS.find(el => el.id === id);
};

const createUser = async userData => {
  return User.create(userData);
  // throw new Error('DB ERROR');
  // const newUser = new User(userData);
  // USERS.push(newUser);

  // return User.toResponse(newUser);
};

const updateUser = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
  // throw new Error('DB ERROR');
  // const userIdx = USERS.findIndex(user => user.id === id);
  // const { name, login, password } = userData;

  // const newUser = new User({ id, name, login, password });
  // USERS[userIdx] = newUser;

  // return User.toResponse(newUser);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
  // throw new Error('DB ERROR');
  // // return USERS.filter(user => user.id !== id);
  // const userIdx = USERS.findIndex(user => user.id === id);

  // if (userIdx < 0) return;

  // taskRepo.unassignUser(id);
  // USERS.splice(userIdx, 1);
  // // taskRepo.deleteBoardTasks({ boardId });

  // return USERS;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

const User = require('./user.model');
// const taskRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  return User.find({});
};

const getUser = async id => {
  return User.findById(id);
};

const createUser = async userData => {
  return User.create(userData);
};

const updateUser = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
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

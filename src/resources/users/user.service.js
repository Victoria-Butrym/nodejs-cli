const usersRepo = require('./user.db.repository');
// const taskRepo = require('../tasks/task.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = async id => {
  const user = await usersRepo.getUser(id);
  // return user;
  if (user) {
    return { code: 200, body: user };
  }
  return { code: 404, body: 'USER_NOT_FOUND' };
};

const createUser = async userData => {
  const newUser = await usersRepo.createUser(userData);
  // console.log(newUser);
  if (newUser) {
    return { code: 200, body: newUser };
  }
  return { code: 404, body: 'USER_NOT_FOUND' };
};

const updateUser = async (id, userData) => {
  const newUser = await usersRepo.updateUser(id, userData);

  if (newUser) {
    return { code: 200, body: newUser };
  }
  return { code: 404, body: 'USER_NOT_FOUND' };
};

const deleteUser = async id => {
  // const deletion = await taskService.getAll();
  // console.log('==USER SERVICE==', todelete);
  await taskService.unassignUser(id);
  const users = await usersRepo.deleteUser(id);
  // console.log('SERVICE====', users);
  if (users) {
    return { code: 200, body: users };
  }
  return { code: 404, body: 'USER_NOT_FOUND' };
};
module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

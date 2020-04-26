const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');
// const bcrypt = require('bcrypt');
// const { SALT_ROUNDS } = require('../../common/config');
// const chalk = require('chalk');

const getAll = () => usersRepo.getAll();

const getUser = async id => await usersRepo.getUser(id);

const createUser = async userData => {
  // console.log(chalk.cyan('USER-Password: '), userData.password);
  // bcrypt.hash(userData.password, SALT_ROUNDS).then(hash => {
  //   console.log('HASH: ', hash);
  // });
  return await usersRepo.createUser(userData);
};

const updateUser = async (id, userData) =>
  await usersRepo.updateUser(id, userData);

const deleteUser = async id => {
  await taskService.unassignUser(id);
  const user = await usersRepo.deleteUser(id);
  return user;
};
module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

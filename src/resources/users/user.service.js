const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return { code: 200, body: users };
};

const getUserByID = async id => {
  const user = await usersRepo.getUserByID(id);
  return { code: 200, body: user };
};

const createUser = async userInfo => {
  const newUser = await usersRepo.createUser(userInfo);
  return { code: 200, body: newUser };
};

const deleteUser = async id => {
  const remainUsers = await usersRepo.deleteUser(id);
  return { code: 200, body: remainUsers };
};

module.exports = { getAll, getUserByID, createUser, deleteUser };

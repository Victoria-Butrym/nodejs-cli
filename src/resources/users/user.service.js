const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return { code: 200, body: users };
};

const getUserByID = async id => {
  const user = await usersRepo.getUserByID(id);
  return { code: 200, body: user };
};

module.exports = { getAll, getUserByID };

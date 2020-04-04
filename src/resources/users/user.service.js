const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return { code: 200, body: users };
};

module.exports = { getAll };

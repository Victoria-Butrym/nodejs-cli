const User = require('./user.model');

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
};

const getUserByLogin = async login => {
  return User.findOne({ login });
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByLogin
};

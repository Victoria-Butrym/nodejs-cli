const User = require('./user.model');
// const bcrypt = require('bcrypt');

const getAll = async () => {
  return User.find({});
};

const getUser = async id => {
  return User.findById(id);
};

const createUser = async userData => {
  // const hash = await bcrypt.hash(this.password, 10);
  return User.create(userData);
};

const updateUser = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const getUserByLogin = async login => {
  // let user;
  // await User.findOne({ login }, (err, result) => {
  //   if (err) {
  //     return false;
  //   }
  //   user = result;
  // });
  // return user;
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

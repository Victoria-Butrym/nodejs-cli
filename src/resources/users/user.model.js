const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { SALT_ROUNDS } = require('../../common/config');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.pre('save', async function Save(next) {
  // if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    // console.log(chalk.red('MODEL-PASSWORD'), this.password);
    console.log(chalk.cyan('SAVED'));
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

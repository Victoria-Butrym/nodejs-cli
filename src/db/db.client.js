const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const { createUser } = require('../resources/users/user.service');

const USERS = [
  new User({ name: 'name1', login: 'login1', password: 'password1' }),
  new User({ name: 'name2', login: 'login2', password: 'password2' })
];

const BOARDS = [new Board(), new Board()];
const TASKS = [new Task(), new Task()];

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to DataBase!');
    db.dropDatabase()
      .then(() => {
        createUser({ name: 'admin', login: 'admin', password: 'admin' });
      })
      .then(() => {
        USERS.forEach(user => user.save());
        BOARDS.forEach(board => board.save());
        TASKS.forEach(task => task.save());

        callback();
      });

    // User.create({ name: 'admin', login: 'admin', password: 'admin' }); // fails after several tests

    // USERS.forEach(user => user.save());
    // BOARDS.forEach(board => board.save());
    // TASKS.forEach(task => task.save());

    // callback();
  });
};

module.exports = { connectToDB };

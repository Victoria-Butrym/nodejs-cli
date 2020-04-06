const tasksRepo = require('./task.memory.repository');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return { code: 200, body: tasks };
};

const getTaskByID = async id => {
  const task = await tasksRepo.getTaskByID(id);
  return { code: 200, body: task };
};

module.exports = { getAll, getTaskByID };

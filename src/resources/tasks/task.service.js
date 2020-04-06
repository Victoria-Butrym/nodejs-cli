const tasksRepo = require('./task.memory.repository');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return { code: 200, body: tasks };
};

const getTaskByID = async id => {
  const task = await tasksRepo.getTaskByID(id);
  return { code: 200, body: task };
};

const updateTask = async (id, taskInfo) => {
  const updatedTask = await tasksRepo.updateTask(id, taskInfo);
  return { code: 200, body: updatedTask };
};

const createTask = async taskInfo => {
  const newTask = await tasksRepo.createTask(taskInfo);
  return { code: 200, body: newTask };
};

module.exports = { getAll, getTaskByID, updateTask, createTask };

const tasksRepo = require('./task.memory.repository');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return { code: 200, body: tasks };
};

const getTaskByID = async id => {
  const task = await tasksRepo.getTaskByID(id);
  return { code: 200, body: task };
};

const updateTask = (id, taskInfo) => {
  const updatedTask = tasksRepo.updateTask(id, taskInfo);
  return { code: 200, body: updatedTask };
};

const createTask = async (id, taskInfo) => {
  const newTask = await tasksRepo.createTask(id, taskInfo);
  return { code: 200, body: newTask };
};

// const deleteTask = async id => {
//   const tasks = await tasksRepo.deleteTask(id);
//   return { code: 200, body: tasks };
// };

const deleteTask = params => tasksRepo.deleteTask(params);

module.exports = { getAll, getTaskByID, updateTask, createTask, deleteTask };

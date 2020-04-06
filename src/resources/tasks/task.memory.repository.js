const Task = require('./task.model');

const TASKS = [new Task()];

// const getAll = async boardId => {
//   const tasks = TASKS.filter(task => task.id === boardId);
//   return tasks;
// };

const getAll = async () => TASKS;

const getTaskByID = async id => {
  const searchedTask = TASKS.filter(task => task.id === id);
  return searchedTask[0];
};

const updateTask = async (id, taskInfo) => {
  const taskIndex = TASKS.find(el => el.id === id);

  const updatedTask = Object.assign(TASKS[taskIndex], taskInfo);
  TASKS[taskIndex] = updatedTask;
  return updatedTask;
};

// const createTask = async () => {
//   const newTask = new Task();
// };

module.exports = { getAll, getTaskByID, updateTask };

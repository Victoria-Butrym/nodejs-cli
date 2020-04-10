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
  const task = TASKS.find(item => item.id === id);
  Object.assign(task, taskInfo);
  return task;
};

const createTask = async taskInfo => {
  const newTask = new Task(taskInfo);
  TASKS.push(newTask);
  return newTask;
};

// const deleteTask = async id => {
//   return TASKS.filter(task => task.id !== id);
// };
const deleteTask = async params => {
  const index = TASKS.findIndex(item => item.id === params.id);

  if (index !== -1) {
    TASKS.splice(index, 1);

    return true;
  }

  return false;
};

module.exports = { getAll, getTaskByID, updateTask, createTask, deleteTask };

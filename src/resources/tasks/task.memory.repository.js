const Task = require('./task.model');

let TASKS = [
  new Task({
    title: 'new task',
    order: 0,
    description: 'description',
    userId: 1,
    boardId: 1,
    columnId: 1
  })
];

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
  const { title, order, description, userId, columnId } = taskInfo;
  const boardId = taskInfo.boardId;
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  TASKS.push(newTask);
  return newTask;
};

const deleteBoardTasks = id => {
  TASKS = [...TASKS].filter(task => {
    task.boardId = id;
  });
  return TASKS;
};

// const deleteAllUserTasks = ({ userId }) => {
//   TASKS = [...TASKS].map(task => {
//     if (task.userId === userId) {
//       task.userId = null;
//     }
//     return task;
//   });
//   return TASKS;
// };
const unassignUser = async id => {
  const userTasks = TASKS.filter(task => task.userId === id);

  userTasks.map(task => {
    task.userId = null;
    return task;
  });
};

const deleteTask = async params => {
  const index = TASKS.findIndex(item => item.id === params.id);

  if (index !== -1) {
    TASKS.splice(index, 1);

    return true;
  }

  return false;
};

module.exports = {
  getAll,
  getTaskByID,
  updateTask,
  createTask,
  deleteTask,
  unassignUser,
  deleteBoardTasks
};

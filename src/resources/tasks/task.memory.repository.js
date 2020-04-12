const Task = require('./task.model');

let TASKS = [new Task()];

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

const createTask = async (params, taskInfo) => {
  const { title, order, description, userId, columnId } = taskInfo;
  const boardId = taskInfo.boardId;
  console.log('CREATE============', boardId);
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
  console.log('TASK BOARD ID', id);
  TASKS = [...TASKS].filter(task => {
    task.boardId = id;
  });
  return TASKS;
};

const deleteAllUserTasks = ({ userId }) => {
  // console.log('----------------', userId);
  TASKS = [...TASKS].map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
  return TASKS;
}; // right

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
  deleteAllUserTasks,
  deleteBoardTasks
};

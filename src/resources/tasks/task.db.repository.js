const Task = require('./task.model');

const TASKS = [new Task()];

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getTask = async (boardId, taskId) => {
  return Task.findById(taskId);
  // const task = TASKS.filter(el => el.boardId === boardId).find(
  //   el => el.id === taskId
  // );
  // return task;
};

const createTask = async (boardId, taskData) => {
  // console.log('TASK CREATE: =====\n', Task.create({ boardId }, taskData));
  const { title, order, description, columnId, userId } = taskData;
  return Task.create({ title, order, description, columnId, userId, boardId });
  // const { title, order, description, userId, columnId } = taskData;
  // const newTask = new Task({ ...taskData, boardId });
  // TASKS.push(newTask);
  // return newTask;
};

const updateTask = async ({ boardId, taskId, taskData }) => {
  return Task.updateOne({ _id: taskId, boardId }, taskData);
  // const taskIdx = TASKS.findIndex(
  //   task => task.boardId === boardId && task.id === taskId
  // );

  // TASKS[taskIdx] = { ...taskData };
  // return TASKS[taskIdx];
};

const deleteTask = async ({ boardId, taskId }) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).deletedCount;
  // if (boardId === 'undefined') return;
  // const index = TASKS.filter(el => el.boardId === boardId).findIndex(el => el.id === taskId);
  // ----
  // const taskIdx = TASKS.findIndex(task => task.id === taskId);
  // if (taskIdx < 0) {
  //   return;
  // }
  // TASKS.splice(taskIdx, 1);
  // return TASKS;
};

const deleteBoardTasks = async boardId => {
  const tasks = TASKS.filter(task => task.boardId === boardId);
  return tasks;
};

const unassignUser = async id => {
  const userTasks = TASKS.filter(task => task.userId === id);

  userTasks.map(task => {
    task.userId = null;
    return task;
  });
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  unassignUser
};

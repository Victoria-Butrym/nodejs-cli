const Task = require('./task.model');

// const TASKS = [new Task()];

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
  const { title, order, description, columnId, userId } = taskData;
  return Task.create({ title, order, description, columnId, userId, boardId });
  // const { title, order, description, userId, columnId } = taskData;
  // const newTask = new Task({ ...taskData, boardId });
  // TASKS.push(newTask);
  // return newTask;
};

const updateTask = async ({ taskId }, taskData) => {
  return Task.updateOne({ _id: taskId }, taskData);
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
  const boardTasks = await Task.find({ boardId });
  // if (boardTasks.length === 0) return false;
  // boardTasks.forEach(task => Task.deleteOne({ _id: task.id }).deletedCount);
  // // console.log('BOARDS TASKS:====', boardTasks);
  return boardTasks;
  // const tasks = TASKS.filter(task => task.boardId === boardId);
  // return tasks;
};

const unassignUser = async id => {
  const userTasks = await Task.find({ userId: id }).exec();
  console.log(id);
  // console.log('USER TASKS==', userTasks);
  // if (userTasks.length !== 0) {
  //   userTasks.map(task => {
  //     task.userId = null;
  //     return task;
  //   });
  //   console.log('DELETION===', userTasks);
  //   return userTasks;
  // }
  // return false;
  userTasks.forEach(task => {
    // task.userId = null;
    // return Task.updateOne({ _id: task.id }, { userId: null });
    updateTask({ taskId: task.id }, { userId: null });
    // return task;
  });

  console.log('USER TASKS==', userTasks);
  // return getAll();
  // console.log('DELETION===', userTasks);
  // return userTasks;
  // const userTasks = TASKS.filter(task => task.userId === id);

  // userTasks.map(task => {
  //   task.userId = null;
  //   return task;
  // });
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

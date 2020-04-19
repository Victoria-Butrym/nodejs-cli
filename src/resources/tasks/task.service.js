const taskRepo = require('./task.db.repository');

const getAll = async boardId => {
  return await taskRepo.getAll(boardId);
};

const getTask = async (boardId, taskId) => {
  const task = await taskRepo.getTask(boardId, taskId);
  return task;
};

const createTask = async (boardId, taskData) => {
  const newTask = await taskRepo.createTask(boardId, taskData);
  return newTask;
};

const updateTask = async ({ taskId }, taskData) =>
  await taskRepo.updateTask({ taskId }, taskData);

const deleteTask = async ({ boardId, taskId }) => {
  const tasks = await taskRepo.deleteTask({ boardId, taskId });
  return tasks;
};

const deleteBoardTasks = async boardId =>
  await taskRepo.deleteBoardTasks(boardId);

const unassignUser = async id => await taskRepo.unassignUser(id);

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  unassignUser
};

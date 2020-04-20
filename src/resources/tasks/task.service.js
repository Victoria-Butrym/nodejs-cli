const taskRepo = require('./task.db.repository');

const getAll = async boardId => await taskRepo.getAll(boardId);

const getTask = async (boardId, taskId) =>
  await taskRepo.getTask(boardId, taskId);

const createTask = async (boardId, taskData) =>
  await taskRepo.createTask(boardId, taskData);

const updateTask = async ({ taskId }, taskData) =>
  await taskRepo.updateTask({ taskId }, taskData);

const deleteTask = async ({ boardId, taskId }) =>
  await taskRepo.deleteTask({ boardId, taskId });

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

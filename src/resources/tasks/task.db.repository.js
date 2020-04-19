const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getTask = async (boardId, taskId) => {
  return Task.findById(taskId);
};

const createTask = async (boardId, taskData) => {
  const { title, order, description, columnId, userId } = taskData;
  return Task.create({ title, order, description, columnId, userId, boardId });
};

const updateTask = async ({ taskId }, taskData) => {
  return Task.updateOne({ _id: taskId }, taskData);
};

const deleteTask = async ({ boardId, taskId }) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).deletedCount;
};

const deleteBoardTasks = async boardId => {
  const boardTasks = await Task.find({ boardId }).exec();
  if (boardTasks.length !== 0) {
    boardTasks.forEach(task => {
      deleteTask({ boardId: task.boardId, taskId: task.id });
    });
  }
  return boardTasks;
};

const unassignUser = async id => {
  const userTasks = await Task.find({ userId: id }).exec();
  if (userTasks.length !== 0) {
    userTasks.forEach(task => {
      updateTask({ taskId: task.id }, { userId: null });
    });
  }
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

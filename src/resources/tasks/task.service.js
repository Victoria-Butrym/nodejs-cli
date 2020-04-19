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
  // console.log('TASK CREATE:=======\n', newTask);
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

// const tasksRepo = require('./task.memory.repository');

// const getAll = async () => {
//   const tasks = await tasksRepo.getAll();
//   return { code: 200, body: tasks };
// };

// const getTaskByID = async id => {
//   const task = await tasksRepo.getTaskByID(id);
//   return { code: 200, body: task };
// };

// const updateTask = (id, taskInfo) => {
//   const updatedTask = tasksRepo.updateTask(id, taskInfo);
//   return { code: 200, body: updatedTask };
// };

// const createTask = async taskInfo => {
//   const newTask = await tasksRepo.createTask(taskInfo);
//   return { code: 200, body: newTask };
// };

// const deleteTask = params => tasksRepo.deleteTask(params);

// module.exports = {
//   getAll,
//   getTaskByID,
//   updateTask,
//   createTask,
//   deleteTask
// };

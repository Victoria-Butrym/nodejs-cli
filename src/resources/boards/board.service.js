const boardRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = async () => {
  return await boardRepo.getAll();
};

const getBoard = async boardId => await boardRepo.getBoard(boardId);

const createBoard = async boardData => await boardRepo.createBoard(boardData);

const updateBoard = async ({ boardId, boardData }) =>
  await boardRepo.updateBoard({ boardId, boardData });

const deleteBoard = async boardId => {
  await tasksService.deleteBoardTasks(boardId); // check await
  const board = await boardRepo.deleteBoard(boardId);
  return board;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

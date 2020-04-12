const boardsRepo = require('./board.memory.repository');
// const tasksService = require('../tasks/task.service');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return { code: 200, body: boards };
};

const getBoardByID = async id => {
  const board = await boardsRepo.getBoardByID(id);
  return { code: 200, body: board };
};

const deleteBoardByID = async id => {
  console.log('BOARD ID ----', id);
  tasksRepo.deleteBoardTasks(id);
  const boards = await boardsRepo.deleteBoardByID(id);
  return { code: 200, body: boards };
};

const createBoard = async boardInfo => {
  const newBoard = await boardsRepo.createBoard(boardInfo);
  return { code: 200, body: newBoard };
};

const updateBoard = async (id, boardInfo) => {
  const updatedBoard = await boardsRepo.updateBoard(id, boardInfo);
  return { code: 200, body: updatedBoard };
};

module.exports = {
  getAll,
  getBoardByID,
  deleteBoardByID,
  createBoard,
  updateBoard
};

const boardsRepo = require('./board.memory.repository');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return { code: 200, body: boards };
};

const getBoardByID = id => {
  return boardsRepo.getBoardsByID(id);
};

const deleteBoardByID = async id => {
  const boards = await boardsRepo.deleteBoardByID(id);
  return { code: 200, body: boards };
};

const createBoard = async boardInfo => {
  const newBoard = await boardsRepo.createBoard(boardInfo);
  return { code: 200, body: newBoard };
};

module.exports = { getAll, getBoardByID, deleteBoardByID, createBoard };

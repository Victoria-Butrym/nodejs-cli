const { Board } = require('./board.model');

const BOARDS = [new Board()]; // check the filling

const getAll = async () => {
  return BOARDS;
};

const getBoardByID = async id => {
  const board = BOARDS.find(el => el.id === id);
  return { code: 200, body: board };
};

const deleteBoardByID = async id => {
  return BOARDS.filter(board => board.id !== id);
};

const createBoard = async boardInfo => {
  const newBoard = new Board(boardInfo);
  BOARDS.push(newBoard);
  return newBoard;
};

module.exports = { getAll, getBoardByID, deleteBoardByID, createBoard };

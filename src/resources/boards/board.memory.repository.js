const { Board } = require('./board.model');

const BOARDS = [new Board()];

const getAll = async () => {
  // Promise.reject(new Error('promise reject'));
  return BOARDS;
};

const getBoardByID = async id => {
  return BOARDS.find(item => item.id === id);
};

const deleteBoardByID = async id => {
  const index = BOARDS.findIndex(board => board.id === id);
  if (index !== -1) {
    BOARDS.splice(index, 1);
    return true;
  }
  return false;
};

const createBoard = async boardInfo => {
  const { title, columns } = boardInfo;
  const newBoard = new Board({ title, columns });

  BOARDS.push(newBoard);

  return newBoard;
};

const updateBoard = async (id, boardInfo) => {
  const board = BOARDS.find(item => item.id === id);

  for (const column of board.columns) {
    for (const detailColumn of boardInfo.columns) {
      if (column.id === detailColumn.id) {
        Object.assign(board, boardInfo);

        return board;
      }
    }
  }
};

module.exports = {
  getAll,
  getBoardByID,
  deleteBoardByID,
  createBoard,
  updateBoard
};

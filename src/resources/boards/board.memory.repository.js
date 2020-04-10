const { Board } = require('./board.model');

const BOARDS = [new Board()]; // check the filling

const getAll = async () => {
  return BOARDS;
};

const getBoardByID = async id => {
  return BOARDS.find(item => item.id === id);
};

// const deleteBoardByID = async id => {
//   const deleteBoard = BOARDS.filter(board => board.id !== id);
//   if (deleteBoard) return deleteBoard;
//   return false;
// };
const deleteBoardByID = async id => {
  return BOARDS.filter(board => board.id !== id);
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

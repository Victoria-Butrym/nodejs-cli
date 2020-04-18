const Board = require('./board.model');
// const taskRepo = require('../tasks/task.memory.repository');

// const BOARDS = [new Board()];

const getAll = async () => {
  return Board.find({});
};

const getBoard = async boardId => {
  return Board.findById(boardId);
  // const board = BOARDS.filter(el => el.id === boardId);

  // if (board.length === 0) return false;
  // return board[0];
};

const createBoard = async boardData => {
  return Board.create(boardData);
  // const newBoard = new Board(boardData);
  // BOARDS.push(newBoard);
  // return newBoard;
};

const updateBoard = async ({ boardId, boardData }) => {
  return Board.updateOne({ _id: boardId }, boardData);
  // const boardIdx = BOARDS.findIndex(board => board.id === boardId);

  // BOARDS[boardIdx] = { ...boardData };

  // return BOARDS[boardIdx];
};

const deleteBoard = async boardId => {
  return (await Board.deleteOne({ _id: boardId })).deletedCount;
  // const boardIdx = BOARDS.findIndex(board => board.id === boardId);

  // if (boardIdx < 0) return;

  // BOARDS.splice(boardIdx, 1);
  // // taskRepo.deleteBoardTasks({ boardId });

  // return BOARDS;
};
// const deleteBoard = async ({ boardId }) => {
//     const index = BOARDS.findIndex(board => board.id === boardId);
//     if (index < 0) {
//         return;
//     }
//     BOARDS.splice(index, 1);
//     taskRepo.deleteBoardTasks({ boardId });
//     return BOARDS;
// };

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

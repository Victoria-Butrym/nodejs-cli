const boardRepo = require('./board.db.repository');

const getAll = async () => {
  return await boardRepo.getAll();
};

const getBoard = async boardId => {
  const board = await boardRepo.getBoard(boardId);
  // console.log('BOARD', board);
  return board;
};

const createBoard = async boardData => await boardRepo.createBoard(boardData);

const updateBoard = async ({ boardId, boardData }) =>
  await boardRepo.updateBoard({ boardId, boardData });

const deleteBoard = async boardId => await boardRepo.deleteBoard(boardId);
// const deleteBoard = async ({ boardId }) => {
//     const boards = await boardRepo.deleteBoard({ boardId });
//     return { code: 200, body: boards };
// };

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

// const boardsRepo = require('./board.memory.repository');
// const tasksRepo = require('../tasks/task.memory.repository');

// const getAll = async () => {
//   const boards = await boardsRepo.getAll();
//   return { code: 200, body: boards };
// };

// const getBoardByID = async id => {
//   const board = await boardsRepo.getBoardByID(id);
//   return { code: 200, body: board };
// };

// const deleteBoardByID = async id => {
//   tasksRepo.deleteBoardTasks(id);
//   const boards = await boardsRepo.deleteBoardByID(id);
//   return { code: 200, body: boards };
// };

// const createBoard = async boardInfo => {
//   const newBoard = await boardsRepo.createBoard(boardInfo);
//   return { code: 200, body: newBoard };
// };

// const updateBoard = async (id, boardInfo) => {
//   const updatedBoard = await boardsRepo.updateBoard(id, boardInfo);
//   return { code: 200, body: updatedBoard };
// };

// module.exports = {
//   getAll,
//   getBoardByID,
//   deleteBoardByID,
//   createBoard,
//   updateBoard
// };

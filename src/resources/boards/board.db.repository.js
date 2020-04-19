const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getBoard = async boardId => {
  return Board.findById(boardId);
};

const createBoard = async boardData => {
  return Board.create(boardData);
};

const updateBoard = async ({ boardId, boardData }) => {
  return Board.updateOne({ _id: boardId }, boardData);
};

const deleteBoard = async boardId => {
  return (await Board.deleteOne({ _id: boardId })).deletedCount;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

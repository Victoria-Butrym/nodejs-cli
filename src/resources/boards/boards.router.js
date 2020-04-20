const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const router = require('express').Router();
const Board = require('../boards/board.model');
const Task = require('../tasks/task.model');
const { ErrorHandler } = require('../../common/logger');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    if (boards.length === 0) {
      throw new ErrorHandler(NOT_FOUND, 'BOARDS_NOT_FOUND');
    }
    return res.status(200).json(boards.map(board => Board.toResponse(board)));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await boardService.getBoard(boardId);
    if (!board) {
      throw new ErrorHandler(NOT_FOUND, 'BOARD_NOT_FOUND');
    }
    return res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  const boardData = req.body;
  if (Object.keys(boardData).length === 0) {
    throw new ErrorHandler(BAD_REQUEST);
  }
  try {
    const board = await boardService.createBoard(boardData);
    return res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  const { boardId } = req.params;
  const boardData = req.body;
  if (Object.keys(boardData).length === 0) {
    throw new ErrorHandler(BAD_REQUEST);
  }
  try {
    const board = await boardService.updateBoard({ boardId, boardData });
    if (!board) {
      throw new ErrorHandler(NOT_FOUND, 'BOARD_NOT_FOUND');
    }
    return res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const board = await boardService.deleteBoard(boardId);
    if (!board) {
      throw new ErrorHandler(NOT_FOUND, 'BOARD_NOT_FOUND');
    }
    return res.status(200).json(board);
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const tasks = await taskService.getAll(boardId);
    if (!tasks) {
      throw new ErrorHandler(NOT_FOUND, 'TASKS_NOT_FOUND');
    }
    return res.status(200).json(tasks.map(task => Task.toResponse(task)));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await taskService.getTask(boardId, taskId);
    if (!task) {
      throw new ErrorHandler(NOT_FOUND, 'TASK_NOT_FOUND');
    }

    return res.status(200).json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/').post(async (req, res, next) => {
  const { boardId } = req.params;
  const taskData = req.body;
  if (Object.keys(taskData).length === 0) {
    throw new ErrorHandler(BAD_REQUEST);
  }
  try {
    const newTask = await taskService.createTask(boardId, taskData);
    if (!newTask) {
      throw new ErrorHandler(NOT_FOUND, 'TASK_NOT_FOUND');
    }
    return res.status(200).json(Task.toResponse(newTask));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  const { taskId } = req.params;
  const taskData = req.body;
  if (Object.keys(taskData).length === 0) {
    throw new ErrorHandler(BAD_REQUEST);
  }
  try {
    const task = await taskService.updateTask({ taskId }, taskData);
    if (!task) {
      throw new ErrorHandler(NOT_FOUND, 'TASK_NOT_FOUND');
    }
    return res.status(200).json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  const { boardId, taskId } = req.params;
  try {
    const task = await taskService.deleteTask({ boardId, taskId });
    if (!task) {
      throw new ErrorHandler(NOT_FOUND, 'TASK_NOT_FOUND');
    }
    return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

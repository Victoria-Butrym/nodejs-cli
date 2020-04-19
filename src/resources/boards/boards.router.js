const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const router = require('express').Router();
const Board = require('../boards/board.model');
const Task = require('../tasks/task.model');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();
    if (boards.length === 0) {
      return res.status(404).end();
    }
    return res.status(200).json(boards.map(board => Board.toResponse(board)));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await boardService.getBoard(boardId);
    if (!board) {
      return res.status(404).end();
    }
    return res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const boardData = req.body;
  try {
    const board = await boardService.createBoard(boardData);
    return res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const boardData = req.body;
  try {
    const board = await boardService.updateBoard({ boardId, boardData });
    if (!board) {
      return res.status(404).end();
    }
    return res.status(200).json(Board.toResponse(board));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;
  try {
    const boards = await boardService.deleteBoard(boardId);
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId/tasks/').get(async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await taskService.getAll(boardId);
    if (!tasks) {
      return res.status(404).end();
    }
    return res.status(200).json(tasks.map(task => Task.toResponse(task)));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await taskService.getTask(boardId, taskId);
    if (!task) {
      return res.status(404).end();
    }

    return res.status(200).json(Task.toResponse(task));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const { boardId } = req.params;
  const taskData = req.body;
  try {
    const newTask = await taskService.createTask(boardId, taskData);
    // console.log('RESPONSE=====\n', Task.toResponse(newTask));
    return res.status(200).json(Task.toResponse(newTask));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { taskId } = req.params;
  const taskData = req.body;
  try {
    const task = await taskService.updateTask({ taskId }, taskData);
    return res.status(200).json(Task.toResponse(task));
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  try {
    const tasks = await taskService.deleteTask({ boardId, taskId });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;

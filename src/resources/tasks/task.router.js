const router = require('express').Router();
const tasksService = require('./task.service');
const { ErrorHandler } = require('../../common/logger');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  // const boardId = req.params;
  try {
    const tasks = await tasksService.getAll();
    if (!tasks) {
      throw new ErrorHandler(BAD_REQUEST);
    }

    res.status(tasks.code).json(tasks.body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { code, body } = await tasksService.getTaskByID(id);

    if (!body) {
      throw new ErrorHandler(NOT_FOUND, 'Task not found');
    }
    res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(BAD_REQUEST);
    }
    const id = req.params.id;
    const taskInfo = req.body;

    const { code, body } = await tasksService.updateTask(id, taskInfo);

    if (!body) {
      throw new ErrorHandler(NOT_FOUND, 'Task not found');
    }
    res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const taskInfo = req.body;
    if (Object.keys(taskInfo).length === 0) {
      throw new ErrorHandler(400, 'Bad request');
    }

    const { code, body } = await tasksService.createTask(req.params, taskInfo);
    if (!body) {
      throw new ErrorHandler(BAD_REQUEST);
    }

    res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res) => {
  const delTask = await tasksService.deleteTask(req.params);

  if (delTask) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;

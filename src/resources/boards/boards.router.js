const router = require('express').Router();
const boardsService = require('./board.service');
const { ErrorHandler } = require('../../common/logger');
const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res, next) => {
  try {
    const { code, body } = await boardsService.getAll();
    if (!body) {
      throw new ErrorHandler(BAD_REQUEST);
    }
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { code, body } = await boardsService.getBoardByID(req.params.id);

    if (!body) {
      throw new ErrorHandler(NOT_FOUND, 'Board not found');
    }
    res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;

    const { code, body } = await boardsService.deleteBoardByID(id);
    if (!body) {
      throw new ErrorHandler(NOT_FOUND, 'Board not found');
    }
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const boardInfo = req.body;

    const { code, body } = await boardsService.createBoard(boardInfo);

    if (!body) {
      throw new ErrorHandler(BAD_REQUEST);
    }
    return res.status(code).json(body);
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
    const boardInfo = req.body;

    const { code, body } = await boardsService.updateBoard(id, boardInfo);

    if (!body) {
      throw new ErrorHandler(NOT_FOUND, 'Board not found');
    }
    return res.status(code).json(body);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;

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
  // console.log(boardId);
  try {
    const boards = await boardService.deleteBoard(boardId);
    // await taskService.deleteBoardTasks(boardId);
    // if (boards.deletedCount.length === 0) {
    //   return res.status(405).end();
    // }
    // console.log('Boards:=========', boards);
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// router.route('/:boardId').delete(async (req, res) => {
//     const { boardId } = req.params;
//     try {
//         const responseData = await boardService.deleteBoard({ boardId });
//         return res.status(responseData.code).json(responseData.body);
//     } catch (error) {
//         return res.status(520).json(error.message);
//     }
// });

router.route('/:boardId/tasks/').get(async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await taskService.getAll(boardId);
    if (!tasks) {
      return res.status(404).end();
    }
    // console.log('GET: TASK ROUTER===', tasks);
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
    // console.log('TASK============', tasks);
    // if (!tasks) {
    //     return res.status(404).json(tasks);
    // }
    // console.log('TASKS===', tasks);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = router;

// const router = require('express').Router();
// const boardsService = require('./board.service');
// const { ErrorHandler } = require('../../common/logger');
// const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

// router.route('/').get(async (req, res, next) => {
//   try {
//     const { code, body } = await boardsService.getAll();
//     if (!body) {
//       throw new ErrorHandler(NOT_FOUND);
//     }
//     return res.status(code).json(body);
//   } catch (error) {
//     return next(error);
//   }
// });

// router.route('/:id').get(async (req, res, next) => {
//   try {
//     const { code, body } = await boardsService.getBoardByID(req.params.id);

//     if (!body) {
//       throw new ErrorHandler(NOT_FOUND, 'Board not found');
//     }
//     res.status(code).json(body);
//   } catch (error) {
//     return next(error);
//   }
// });

// router.route('/').post(async (req, res, next) => {
//   try {
//     if (Object.keys(req.body).length === 0) {
//       throw new ErrorHandler(BAD_REQUEST);
//     }
//     const boardInfo = req.body;

//     const { code, body } = await boardsService.createBoard(boardInfo);

//     if (!body) {
//       throw new ErrorHandler(BAD_REQUEST);
//     }
//     return res.status(code).json(body);
//   } catch (error) {
//     return next(error);
//   }
// });

// router.route('/:id').put(async (req, res, next) => {
//   try {
//     if (Object.keys(req.body).length === 0) {
//       throw new ErrorHandler(BAD_REQUEST);
//     }
//     const id = req.params.id;
//     const boardInfo = req.body;

//     const { code, body } = await boardsService.updateBoard(id, boardInfo);

//     if (!body) {
//       throw new ErrorHandler(NOT_FOUND, 'Board not found');
//     }
//     return res.status(code).json(body);
//   } catch (error) {
//     return next(error);
//   }
// });
// router.route('/:id').delete(async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const { code, body } = await boardsService.deleteBoardByID(id);
//     if (!body) {
//       throw new ErrorHandler(NOT_FOUND, 'Board not found');
//     }
//     return res.status(code).json(body);
//   } catch (error) {
//     return next(error);
//   }
// });
// module.exports = router;

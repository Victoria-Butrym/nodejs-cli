const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  // const boardId = req.params;
  const tasks = await tasksService.getAll();

  res.status(tasks.code).json(tasks.body);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const { code, body } = await tasksService.getTaskByID(id);
  res.status(code).json(body);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const taskInfo = req.body;

  const { code, body } = await tasksService.updateTask(id, taskInfo);
  res.status(code).json(body);
});

router.route('/').post(async (req, res) => {
  const taskInfo = req.body;
  const { code, body } = await tasksService.createTask(taskInfo);
  res.status(code).json(body);
});

// router.route('/:id').delete(async (req, res) => {
//   const id = req.params.id;
//   const task = await tasksService.deleteTask(id);
//   if (task) {
//     res.status(task.code).json(task.body);
//   }
//   res.status(404);
// });

router.route('/:id').delete(async (req, res) => {
  const delTask = await tasksService.deleteTask(req.params);

  if (delTask) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;

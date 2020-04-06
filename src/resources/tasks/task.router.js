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

module.exports = router;

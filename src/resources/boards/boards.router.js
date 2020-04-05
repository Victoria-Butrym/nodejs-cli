const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const { code, body } = await boardsService.getAll();
  return res.status(code).json(body);
});

// router.route('/:id').get(async (req, res) => {
//   const id = req.params.id;

//   const { code, body } = await boardsService.getBoardByID(id);
//   return res.status(code).json(body);
// });

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;

  const { code, body } = await boardsService.deleteBoardByID(id);
  return res.status(code).json(body);
});
module.exports = router;

const router = require('express').Router();

const { getAllLeaves, getLeaveById } = require('../controllers/leave');

router.get('/', getAllLeaves);
router.get('/:id', getLeaveById);

module.exports = router;
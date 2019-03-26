const router = require('express').Router();
const { getAllLeaves, getLeaveById, addLeave } = require('../controllers/leave');

router.get('/', getAllLeaves);
router.get('/:id', getLeaveById);
router.post('/', addLeave);

module.exports = router;
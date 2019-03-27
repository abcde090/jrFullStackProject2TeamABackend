const router = require('express').Router();
const { getAllLeaves, 
        getLeaveById, 
        addLeave, 
        approveRequest,
        updateLeave,
        deleteOneLeave,
        deleteAllLeaveOfUser } = require('../controllers/leave');

router.get('/', getAllLeaves);
router.get('/:id', getLeaveById);
router.put('/approve/:id', approveRequest);
router.put('/:id', updateLeave);
router.delete('/:id', deleteOneLeave)
router.delete('/delete-leaves/:id',deleteAllLeaveOfUser);
router.post('/', addLeave);

module.exports = router;
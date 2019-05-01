const authorization = require('../middlewares/authorization')
const adminRole = require('../middlewares/adminRole')
const router = require('express').Router();
const { getAllLeaves, 
        getLeaveById, 
        addLeave, 
        approveRequest,
        rejectRequest,
        updateLeave,
        deleteOneLeave,
        deleteAllLeaveOfUser } = require('../controllers/leave');

router.get('/', getAllLeaves);
router.get('/:id', authorization,getLeaveById);
router.put('/approve/:id', approveRequest);
router.put('/reject/:id', rejectRequest);
router.put('/:id', updateLeave);
router.delete('/:id', deleteOneLeave)
router.delete('/delete-leaves/:id',deleteAllLeaveOfUser);
router.post('/',addLeave);

module.exports = router;
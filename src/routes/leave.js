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
        deleteAllLeaveOfUser,
        getLeaveByStatus,
        getSortedLeaveByUserId } = require('../controllers/leave');

router.get('/', getAllLeaves);
//'/status/approved or /status/request'
router.get('/status/:status',getLeaveByStatus);
router.get('/:id', authorization,getLeaveById);
router.get('/user/:id',getSortedLeaveByUserId)
router.patch('/approve', approveRequest);
router.put('/:id', updateLeave);
router.delete('/:id', deleteOneLeave)
router.delete('/delete-leaves/:id',deleteAllLeaveOfUser);
router.post('/',addLeave);

module.exports = router;
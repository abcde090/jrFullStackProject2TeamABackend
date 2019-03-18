const router = require('express').Router();

const { getAllUsers, getUserById,addUser } = require('../controllers/user');
const authorize = require('../middlewares/authorize')

router.post('/user', addUser);
router.post('/auth',)
router.get('/me', getUserById);
router.get('/',getAllUsers)

module.exports = router;
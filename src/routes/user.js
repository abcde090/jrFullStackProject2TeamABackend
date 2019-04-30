const router = require('express').Router();

const { getAllUsers, getUserById,addUser, updateOneUser, deleteOneUser,addUserWithoutToken，getUserByRole } = require('../controllers/user');
const authorization = require('../middlewares/authorization')
const adminRole = require('../middlewares/adminRole')
const authentication = require('../controllers/authentication')
const bodyParser = require('body-parser')
//public url
router.use(bodyParser.json());
router.get('/test',(req,res)=>{
    const {user,password} = req.body;
    console.log(user);
})
router.post('/', addUser);
router.post('/add',addUserWithoutToken)
router.post('/auth',authentication);
router.patch('/:id',authorization,updateOneUser);
router.delete('/:id',authorization,adminRole,deleteOneUser);
//need authorization
router.get('/:id', authorization,getUserById);
//need admin role and authorization
router.get('/',authorization,adminRole,getAllUsers);
router.get('/user/:role',getUserByRole);

module.exports = router;
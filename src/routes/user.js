const router = require('express').Router();

const { getAllUsers, getUserById,addUser, updateOneUser, deleteOneUser } = require('../controllers/user');
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
router.put('/:id',updateOneUser);
router.delete('/:id',deleteOneUser);
router.post('/auth',authentication);
//need authorization
router.get('/:id', authorization,getUserById);
//need admin role and authorization
router.get('/',authorization,adminRole,getAllUsers);

module.exports = router;
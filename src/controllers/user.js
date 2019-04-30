const User = require('../models/user');
const leaveService = require('../services/leave');
const logger = require('../utils/logger')
const { findByField, createUser, updateUser, deleteUser,removeOneLeaveFromUser } = require('../services/user');
const { responseFormatter } = require('../utils/helpers')
const Jwt = require('../utils/jwt')

const getUserById = async (req, res) => {
	const { id } = req.params; //ES6 destructuring
	const user = await User.findById(id);
	return res.json(user);
};

const getAllUsers = async (req, res) => {
	const users = await User.find();
	return res.json(users);
};

const getUserByRole = async (req, res) => {
	const {role} = req.params;
	const users = await User.find().where("role",role);
	return res.json(users);
};

const addUser = async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await findByField({ email });
	if (userExist) {
		//email exist
		return responseFormatter(res, { email }, 400, "email exist")
	} else {
		const user = await createUser({
			name,
			email,
			password
		})
		const userId = user._id;
		const role = user.role;
		token = Jwt.createToken({
			userId,
			role
		})
		console.log(token)
		return responseFormatter(res, { userId: user._id, token })
	}
}
const deleteOneUser = async (req, res) => {
	const { id } = req.params;
	const user = await deleteUser(id);
	return responseFormatter(res, user, 200);
}
const updateOneUser = async (req, res)=>{
	const { id } = req.params
	const {name, email, password, role} = req.body;
	const userExist = await findByField({ email });
	if (userExist) {
		const user = await updateUser(id,{
			name,
			email,
			password,
			role
		})
		token = Jwt.createToken({
			id,
			role
		})
		return responseFormatter(res, { user, token })
	} else {
		return responseFormatter(res, { user_name:name }, 400, "No user exist")
	}
}


module.exports = {
	getUserById,
	getAllUsers,
	addUser,
	deleteOneUser,
	updateOneUser,
	getUserByRole
};
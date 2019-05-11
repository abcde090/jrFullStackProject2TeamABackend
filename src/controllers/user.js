const User = require('../models/user');
const leaveService = require('../services/leave');
const logger = require('../utils/logger')
const { findByField, createUser, updateUser, deleteUser, removeOneLeaveFromUser } = require('../services/user');
const { responseFormatter } = require('../utils/helpers')
const Jwt = require('../utils/jwt')

const getUserById = async (req, res) => {
	const { id } = req.params; //ES6 destructuring
	const user = await User.findById(id);
	return res.json(user);
};

const getAllUsers = async (req, res) => {
	if (Object.keys(req.query).length !== 0) {
		const user = await findByField(req.query)
		return res.json(user)
	} else {
		const users = await User.find();
		return res.json(users);
	}
};

const getUserByRole = async (req, res) => {
	const {role} = req.params;
	const users = await User.find().where("role",role);
	return res.json(users);
};

const addUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	console.log(req.body);
	const userExist = await findByField({ email });
	if (userExist) {
		//email exist
		return responseFormatter(res, { email }, 400, "email exist")
	} else {
		const user = await createUser({
			firstName,
			lastName,
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
const addUserWithoutToken = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	console.log(req.body);
	const userExist = await findByField({ email });
	if (userExist) {
		//email exist
		return responseFormatter(res, { email }, 400, "Email Exist")
	} else {
		const user = await createUser({
			firstName,
			lastName,
			email,
			password
		})
		return responseFormatter(res,user, 200)
	}
}
const deleteOneUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (user.role === 'admin') {
		return responseFormatter(res,{}, 400, "Can't delete admin")
	} else {
		const user = await deleteUser(id);
		return responseFormatter(res, user,200);
	}

}
const updateOneUser = async (req, res) => {
	console.log(req.body)
	const { id } = req.params
	// const { firstName,lastName, email,address,password } = req.body;
	const userExist = await User.findById(id);
	if (userExist) {
		const user = await updateUser(id, req.body)
		return responseFormatter(res, { user })
	} else {
		return responseFormatter(res, { user_name: name }, 400, "User Not Exist")
	}
}


module.exports = {
	getUserById,
	getAllUsers,
	addUser,
	deleteOneUser,
	updateOneUser,
	addUserWithoutToken,
	getUserByRole
};
const User = require('../models/user');
const logger = require('../utils/logger')
const { findByField, createUser } = require('../services/user');
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

const addUser = async (req, res) => {
	const { email, password } = req.body;
	const userExist = await findByField({ email });
	if (userExist) {
		//email exist
		return responseFormatter(res, { email }, 400, "email exist")

	} else {

		const user = await createUser({
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

module.exports = {
	getUserById,
	getAllUsers,
	addUser
};
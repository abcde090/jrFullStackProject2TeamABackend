const User = require('../models/user');

const getUserById = async (req, res) => {
	const { id } = req.params; //ES6 destructuring
	const user = await User.findById(id);
	return res.json(user);
};

const getAllUsers = async (req, res) => {
	const users = await User.find();
	return res.json(users);
};

module.exports = {
	getUserById,
	getAllUsers
};
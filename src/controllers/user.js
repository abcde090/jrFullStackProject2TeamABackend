const User = require('../models/user');

const getUserById = async (req, res) => {
	const { id } = req.params; //ES6 destructuring
	const user = await User.findById(id);
	console.log(user);
	return res.json(user);
};

const getAllUsers = async (req, res) => {
	const users = await User.find();
	return res.json(users);
};

const addUser = async (req, res) =>{
	
}

module.exports = {
	getUserById,
	getAllUsers,
	addUser
};
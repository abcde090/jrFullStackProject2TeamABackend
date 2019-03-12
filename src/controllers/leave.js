const Leave = require('../models/leave');

const getLeaveById = async (req, res) => {
	const { id } = req.params; //ES6 destructuring
	const leave = await Leave.findById(id);
	return res.json(leave);
};

const getAllLeaves = async (req, res) => {
	const leaves = await Leave.find();
	return res.json(leaves);
};

module.exports = {
	getLeaveById,
	getAllLeaves
};
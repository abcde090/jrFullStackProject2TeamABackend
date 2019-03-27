const User = require('../models/user');

const findByField = async (field) => {
	return await User.findOne(field);
}

const createUser = async (payload) => {
	const { name, email, password } = payload;
	const user = new User({
		name, 
		email,
		password,
		role: "staff"
	})
	return user.save();
}

const updateUser = async(UserId, fields) =>{
	return User.findByIdAndUpdate(UserId, fields, {
		new: true,
		runValidators: true
	});
}

const deleteUser = async(id) =>{
	return User.findByIdAndDelete(id)
}

const addLeaveToUser = async (UserId, LeaveId)=> {
	return await User.findByIdAndUpdate(UserId, {
		$push: {
			leaves: LeaveId,
		}
	},
	{
		new: true,
		runValidators: true
	});
}

const removeOneLeaveFromUser = async (UserId, LeaveId)=> {
	return await User.findByIdAndUpdate(UserId, {
		$pull: {
			leaves: LeaveId,
		}
	},
	{
		new: true,
		runValidators: true
	});
}

module.exports = {
	findByField,
	createUser,
	addLeaveToUser,
	updateUser,
	removeOneLeaveFromUser,
	deleteUser,
}


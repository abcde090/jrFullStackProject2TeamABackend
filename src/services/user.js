const User = require('../models/user');
const findByField = async (field) => {
	return await User.findOne(field);
}

const createUser = async (payload) => {
	const { email, password } = payload;

	const user = new User({
		email,
		password,
		role: "staff"
	})
	return user.save();
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

module.exports = {
	findByField,
	createUser,
	addLeaveToUser
}


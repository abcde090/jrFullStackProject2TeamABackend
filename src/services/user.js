const User = require('../models/user');

const findByField = async (field) => {
	return await User.findOne(field);
}

const createUser = async (payload) => {
	const { firstName,lastName, email, password } = payload;
	const user = new User({
		firstName, 
		lastName,
		email,
		password,
		role: "staff",
		annualLeaveBalance:480,
		personalLeaveBalance:240
	})
	return user.save();
}

const updateUser = async(UserId, fields) =>{
	return User.findByIdAndUpdate(UserId, fields, {
		new: true,
		runValidators: true
	});
}

const updateUserLeaveBalance = async(UserId, leaveType, duration,paid) =>{
	if(leaveType==='annual' && paid===true) {
		return await User.findByIdAndUpdate(UserId, {
			$inc: {
				annualLeaveBalance: -duration,
			}
		},
		{
			new: true,
			runValidators: true
		})
	}
	if(leaveType==='personal' && paid==='true') {
		return await User.findByIdAndUpdate(UserId, {
			$inc: {
				personalLeaveBalance: -duration,
			}
		},
		{
			new: true,
			runValidators: true
		})
	}
	
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
	updateUserLeaveBalance,
	removeOneLeaveFromUser,
	deleteUser,
}


const Leave = require('../models/leave');
const Service = require('./service');
const User = require('../services/user');
class LeaveService extends Service {
	async approveRequest(LeaveId){
		return await Leave.findByIdAndUpdate(LeaveId, {
			$set: {
				isApproved: "approved",
			}
		},
		{
			new: true,
			runValidators: true
		}).then(item=>{
			const leaveType = item.leaveType.leaveSubType;
			const paid = item.leaveType.Paid;
			const duration = item.duration;
			const applicant = item.applicant
			console.log(duration);
			console.log(applicant);
			console.log(paid);
			console.log(leaveType)
			return User.updateUserLeaveBalance(applicant,leaveType,duration,paid)
			
		}

		);
	}
	async rejectRequest(LeaveId){
		return await Leave.findByIdAndUpdate(LeaveId, {
			$set: {
				isApproved: "rejected",
			}
		},
		{
			new: true,
			runValidators: true
		});
	}
}

module.exports = new LeaveService(Leave);
const Leave = require('../models/leave');
const Service = require('./service');
const User = require('../services/user');
class LeaveService extends Service {
	async approveRequest({ id, action }) {
		return await Leave.findByIdAndUpdate(id, {
			$set: {
				isApproved: action,
			}
		},
			{
				new: true,
				runValidators: true
			}).then(item => {
				if (item.isApproved === 'approved') {
					const leaveType = item.leaveType.leaveSubType;
					const paid = item.leaveType.Paid;
					const duration = item.duration;
					const applicant = item.applicant
					console.log(duration);
					console.log(applicant);
					console.log(paid);
					console.log(leaveType)
					return User.updateUserLeaveBalance(applicant, leaveType, duration, paid)
				}else{
					return item;
				}
			});
	}
	async rejectRequest(LeaveId) {
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
	async findAllByField(field) {
		return await Leave.find(field).populate('applicant');
	}
}

module.exports = new LeaveService(Leave);
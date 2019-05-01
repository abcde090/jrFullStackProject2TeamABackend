const Leave = require('../models/leave');
const Service = require('./service');

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
		});
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
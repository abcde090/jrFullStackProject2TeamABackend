const Leave = require('../models/leave');
const Service = require('./service');

class LeaveService extends Service {
	async approveRequest(LeaveId){
		return await Leave.findByIdAndUpdate(LeaveId, {
			$set: {
				isApproved: true,
			}
		},
		{
			new: true,
			runValidators: true
		});
	}
}

module.exports = new LeaveService(Leave);
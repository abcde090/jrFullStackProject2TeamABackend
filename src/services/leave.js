const Leave = require('../models/leave');
const Service = require('./service');

class LeaveService extends Service {
	async approveRequest({id,action}){
		return await Leave.findByIdAndUpdate(id, {
			$set: {
				isApproved: action,
			}
		},
		{
			new: true,
			runValidators: true
		});
	}
	async findAllByField(field){
		return await Leave.find(field).populate('applicant');
	}
}

module.exports = new LeaveService(Leave);
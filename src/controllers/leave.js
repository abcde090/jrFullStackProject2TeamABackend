const leaveService = require('../services/leave');
const Leave = require('../models/leave');
const user = require('../services/user');
const { responseFormatter } = require('../utils/helpers');

async function getAllLeaves(req, res) {
	const total = await courseService.countAll();
	const { pagination, sort, search } = convertQuery(req.query, total);
  
	const leaves = await leaveService.getAll(pagination, sort, search);
  
	return responseFormatter(res, { data: leaves, pagination });
  }
  
async function getLeaveById(req, res) {
	const { id } = req.params;
	const leave = await leaveService.getOneWithPopulate(id, {
	  applicant: 'name',
	  supervisor: 'name'
	});
	if (!leave) {
	  return responseFormatter(res, 'Leave not found', 404);
	}
  
	return responseFormatter(res, leave);
}

async function addLeave(req, res){
	const{description,leaveSubType,paid,applicant,supervisor}=req.body
	const leave = await leaveService.createOne({
		applicant,
		supervisor,
		leaveType:{
			leaveSubType:leaveSubType,
			Paid:paid,
		},
		description,
		isApproved:false,
	});
	const leaveId = leave._id;
	console.log(leaveId);
	const applicantId = applicant;
	const supervisorId = supervisor;
	await user.addLeaveToUser(applicantId, leaveId);
	await user.addLeaveToUser(supervisorId, leaveId);

	
	return responseFormatter(res,leave, 201);
}

module.exports = {
	getLeaveById,
	getAllLeaves,
	addLeave,
};
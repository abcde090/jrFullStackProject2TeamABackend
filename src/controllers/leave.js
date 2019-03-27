const leaveService = require('../services/leave');
const user = require('../services/user');
const User = require('../models/user');
const { responseFormatter, convertQuery } = require('../utils/helpers');

async function getAllLeaves(req, res) {
	const total = await leaveService.countAll();
	const { pagination, sort, search } = convertQuery(req.query, total);
	const leaves = await leaveService.getAll(pagination, sort, search);
	return responseFormatter(res, { data: leaves, pagination });
}
  
async function getLeaveById(req, res) {
	const { id } = req.params;
	const leave = await leaveService.getOneWithPopulate(id, {
		applicant:'name',
		supervisor:'name',
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
	const applicantId = applicant;
	const supervisorId = supervisor;
	await user.addLeaveToUser(applicantId, leaveId);
	await user.addLeaveToUser(supervisorId, leaveId);
	return responseFormatter(res,leave, 201);
}

async function approveRequest(req,res){
	const { id } = req.params;
	const leave = await leaveService.approveRequest(id); 
	return responseFormatter(res,leave, 201);
	
}

async function updateLeave(req, res){
	const { id } = req.params;
	const{description,leaveSubType,paid,applicant,supervisor,isApproved}=req.body
	console.log(leaveSubType);
	console.log(paid);
	const leave = await leaveService.updateOne(id,{
		applicant,
		supervisor,
		leaveType:{
			leaveSubType:leaveSubType,
			Paid:paid,
		},
		description,
		isApproved
	});
	return responseFormatter(res,leave, 201);
}

async function deleteLeave(id){
	const leaveDelete = await leaveService.getOne(id);
	const applicantId = leaveDelete.applicant;
	const supervisorId = leaveDelete.supervisor;
	await user.removeOneLeaveFromUser(applicantId, id);
	await user.removeOneLeaveFromUser(supervisorId, id);
	await leaveService.deleteOne(id);
	return leaveDelete
}

async function deleteOneLeave(req,res){
	const { id } = req.params;
	const leaveDelete = await deleteLeave(id);
	return responseFormatter(res,leaveDelete, 201);
}

async function deleteAllLeaveOfUser(req,res){
	const { id } = req.params;
	const userUpdate = await User.findById(id);
	console.log(userUpdate);
	userUpdate.leaves.map(leave =>{
		console.log(leave);
		deleteLeave(leave._id);
	})
	return responseFormatter(res, userUpdate, 201);
}

module.exports = {
	getLeaveById,
	getAllLeaves,
	addLeave,
	approveRequest,
	updateLeave,
	deleteOneLeave,
	deleteAllLeaveOfUser,
};
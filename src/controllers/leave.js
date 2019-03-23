const leaveService = require('../services/leave');
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
	console.log(req.body);
	const{description,leaveSubType,paid}=req.body
	const leave = await leaveService.createOne({
		leaveType:{
			leaveSubType:leaveSubType,
			Paid:paid,
		},
		description,
		isApproved:false,
	});
	return responseFormatter(res,leave, 201);
  }

module.exports = {
	getLeaveById,
	getAllLeaves,
	addLeave
};
const mongoose = require('mongoose');
const leaveTypeSchema = new mongoose.Schema(
	{
	  leaveSubType: String,
	  Paid: Boolean,
	  required:true,
	},
	{ _id: false }
);
const leaveSchema = new mongoose.Schema(
    {
		_id: {
			type: String,
			uppercase: true,
			alias: 'code',
			required: true,
		},
		// applicant:{
		// 	type:String,
		// 	ref: 'User',
		// 	required:true,
		// },
		description: {
			type:String,
			required:true,
		},
		leaveType:leaveTypeSchema,
<<<<<<< HEAD
		//applicant:{ type: String, ref: 'User' },
		startTime:Date,
		endTime:Date,
		//supervisor:{type:String, ref: 'User'},
		isApproved:Boolean
=======
		startTime:{
			type:Date,
			required:true,
		},
		endTime:{
			type:Date,
			required:true,
		},
		// sendTo:{
		// 	type:String, 
		// 	ref: 'User',
		// 	required: true,
		// },
		isApproved:{
			type:Boolean,
			required:true,
		}
>>>>>>> add leave schema

	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		},
	}
);
leaveSchema.virtual('duration').get(function() {
	return `${this.endTime}`;
  });

module.exports = mongoose.model('Leave', leaveSchema);

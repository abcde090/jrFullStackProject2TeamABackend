const mongoose = require('mongoose');
const leaveTypeSchema = new mongoose.Schema(
	{
	  leaveSubType: String,
	  Paid: Boolean,
	},
	{ _id: false }
);
const leaveSchema = new mongoose.Schema(
    {
		_id: {
			type: String,
			minlength: minlengthOfDetail,
			required: true
		},
		applicant:{
			type:String,
			ref: 'User'
		},
		description: String,
		leaveType:leaveTypeSchema,
		//applicant:{ type: String, ref: 'User' },
		startTime:Date,
		endTime:Date,
		//supervisor:{type:String, ref: 'User'},
		isApproved:Boolean

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

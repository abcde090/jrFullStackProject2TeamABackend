const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const leaveSchema = new mongoose.Schema(
    {
		applicant:{
			type: ObjectId,
			ref: 'User',
			required:true
		},
		description: {
			type:String,
		},
		leaveType:{
			leaveSubType: String,
			Paid: Boolean,
		},
		startTime:{
			type:Date,
		},
		endTime:{
			type:Date,
		},
		supervisor:{
			type: ObjectId, 
			ref: 'User',
		},
		//approve status,true when approved, false when reject
		isApproved:{
			type:String,
			default: "pending",
			required:true
		}
	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		},
		id:false,
	}
);
leaveSchema.virtual('duration').get(function() {
	return Math.ceil((this.endTime-this.startTime)/3600000);
});

module.exports = mongoose.model('Leave', leaveSchema);

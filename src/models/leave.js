const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const leaveSchema = new mongoose.Schema(
    {
		applicant:{
			type: ObjectId,
			ref: 'User',
		},
		description: {
			type:String,
		},
		leaveType:{
			leaveSubType: String,
			Paid: Boolean,
		},
		// startTime:{
		// 	type:Date,
		// },
		// endTime:{
		// 	type:Date,
		// },
		supervisor:{
			type: ObjectId, 
			ref: 'User',
		},
		isApproved:{
			type:Boolean,
			default: false,
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
// leaveSchema.virtual('duration').get(function() {
// 	return `${this.endTime}`;
//   });

module.exports = mongoose.model('Leave', leaveSchema);

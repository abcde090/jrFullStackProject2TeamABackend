/*follow the structure of 
{
    "leave":{
        "user_id":"",
        "leave_id":"",
        "leave_type":"",
        "duration":["full day","multiple days","part day"],
        "start_date":"",
        "end_date":"",
        "detail":"",
        "Sent to":"",
        "message":"",
        "submit":"",
        "aprrove":{
            "isApproved":"",
            "approvedBy":""
        }
    }
}
 */ 
const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;
const minlengthOfDetail = 20;

const leaveSchema = new Schema(
	{
		startDate: {
			type: Date,
			required:true
		},
		endDate: {
			type:Date,
			required:true
		},
		leaveType: [{
			type: String,

			required:true
		}],
		detail: {
			type: String,
			minlength: minlengthOfDetail,
			required: true
		},
		sendTo: {
			type: String,
			alias: "supervisor"
		},
		isSubmitted: {
			type: Boolean,
			required: true
		},
		approveInfo: {
			isApproved: {
				type:Boolean,
			},
			approvedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Admin"
			},
			userId:{
				type:mongoose.SchemaTypes.ObjectId,
				ref:"Staff",
				required: true
			}
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
	}
);

module.exports = mongoose.model('Leave', leaveSchema);

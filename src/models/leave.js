const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
    {
		_id: {
			type: String,
			uppercase: true,
			alias: 'code'
		},
	},
    {
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		},
		id: false
    }
);

module.exports = mongoose.model('Leave', leaveSchema);
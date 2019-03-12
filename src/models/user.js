const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			uppercase: true,
			alias: 'code'
		},
		role: String,
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

module.exports = mongoose.model('User', userSchema);
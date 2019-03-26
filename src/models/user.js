const mongoose = require('mongoose');
const Joi = require('joi')
// const bcrypt = require('bcrypt')
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minlength: 2
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			// cannot validate the uniqueness here, it will break the update function
			validate: {
				validator: email => !Joi.validate(email, Joi.string().email()).error,
				msg: 'Invalid email format'
			}
		},
		password: {
			type: String,
			select: false
		},
		role:{
			type: String,
			select: true
		},
		leaves: [{ 
			type: ObjectId, 
			ref: 'Leave'
		}]
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
userSchema.methods.hashPassword = async function () {
	this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.validatePassword = async function (password) {
	const validPassword = await bcrypt.compare(password, this.password);
	return validPassword;
};


module.exports = mongoose.model('User', userSchema);
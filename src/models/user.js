const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2
		},
		email: {
			type: String,
			required: true,
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
			required: true,
			select: false
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
userSchema.methods.hashPassword = async function () {
	this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.validatePassword = async function (password) {
	const validPassword = await bcrypt.compare(password, this.password);
	return validPassword;
};


module.exports = mongoose.model('User', userSchema);
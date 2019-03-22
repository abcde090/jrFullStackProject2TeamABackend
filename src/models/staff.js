const mongoose = require('mongoose');
const Joi = require('joi');
const Person = require('./person');
const Schema = mongoose.Schema;

const Staff = Person.discriminator("Staff", new Schema({
	leaveStatue: {
		type: Boolean
	},
	leaveList: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Leave"
	}]
}))



module.exports = Staff;
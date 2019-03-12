const mongoose = require('mongoose');
const Joi = require('joi');
const Person = require('./person');

module.exports = mongoose.model("Admin",Person);
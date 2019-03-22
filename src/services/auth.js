const User = require('../models/user')
module.exports = async (payload) => {
	const { email, password } = payload;
	const user = await User.findOne({ email, password });
	return user;

}
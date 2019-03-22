const { admin, staff } = require('../utils/roles');
const { responseFormatter } = require('../utils/helpers')

module.exports = (req, res, next) => {
	if (req.user.role === admin) {
		next();
	} else {
		return responseFormatter(res, {}, 401, "access denied! unauthorized user")
	}
} 
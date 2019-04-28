const { validateToken } = require('../utils/jwt')
const { responseFormatter } = require('../utils/helpers');
module.exports = (req, res, next) => {
	const authHeader = req.header("authorization")
	if (!authHeader) {
		return responseFormatter(res, {}, 401, "invalid authorization")
	}
	tokenArr = authHeader.split(" ");
	if (tokenArr.length !== 2 || tokenArr[0] !== "Bearer") {
		return responseFormatter(res, {}, 401, "invalid authorization format")
	}

	const decoded = validateToken(tokenArr[1]);
	if (decoded) {

		req.user = decoded;
		return next();
	}
	return responseFormatter(res, {}, 401, "invalid token");
}
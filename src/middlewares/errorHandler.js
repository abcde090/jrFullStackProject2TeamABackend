const responseFormatter = require('../utils/responseFormatter');
const logger = require('../utils/logger');

module.exports = (error, req, res, next) => {
	logger.error(error.stack);
	return responseFormatter(
		res,
		500,
		'Something failed, we are investigating!',
		null
	);
};
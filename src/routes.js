const express = require('express');
const userRoute = require('./routes/user');
const leaveRoute = require('./routes/leave');
const responseFormatter = require('./utils/responseFormatter');
const router = express.Router();
router.get('/api', (req, res) =>
	responseFormatter(
		res,
		200,
		'Welcome to the insight people api!',
		null
	)
);
router.use('/api/users', userRoute);
router.use('/api/leaves', leaveRoute);

module.exports = router;
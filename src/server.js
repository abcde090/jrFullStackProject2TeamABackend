const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser')
const routes = require('./routes');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const notFoundHandler = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger/swagger.json');
process.on('uncaughtException', e => {
	logger.error(e.message);
	process.exit(1);
});

process.on('unhandledRejection', e => {
	logger.error(e.message);
	process.exit(1);
});

const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
// app.all('/api/*', function (req, res, next) {
// 	console.log('dadad');
// 	const allowedOrigins = ['http://localhost:3111','http://localhost:8000', 'https://learn.jiangren.com.au', 'http://learn.jiangren.com.au', 'http://127.0.0.1:8080','http://jrdashboard.s3-website-ap-southeast-2.amazonaws.com'];
// 	const origin = req.headers.origin;
// 	if (allowedOrigins.indexOf(origin) > -1) {
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	}
// 	res.header('Access-Control-Allow-Credentials', true);
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
// 	res.header('Access-Control-Allow-Headers', 'Origin, Authorization, x-xsrf-token,X-Requested-With, Content-Type, Accept, x-access-token');
// 	//intercepts OPTIONS method
// 	if ('OPTIONS' === req.method) {
// 		//respond with 200
// 		res.send(200);
// 	} else {
// 		next();
// 	}
// });
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
} else {
	app.use(morgan('common'));
}

app.use(routes);
app.use(errorHandler);
app.use(notFoundHandler);

// 
const { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } = process.env;
let connectionUrl;
if (DB_USER && DB_PASSWORD) {
	connectionUrl =
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true`
} else {
	connectionUrl = 'mongodb://localhost:27017/jr-ipm';
}
mongoose
	.connect(connectionUrl, { useNewUrlParser: true })
	.then(() => {
		logger.info('DB connected');
		app.listen(PORT, () => logger.info(`app listen on port ${PORT}`));
	})
	.catch(e => {
		logger.info('DB connection failed');
		throw new Error(e);
	});

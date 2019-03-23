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

process.on('uncaughtException', e => {
	logger.error(e.message);
	process.exit(1);
});

process.on('unhandledRejection', e => {
	logger.error(e.message);
	process.exit(1);
});

const app = express();

app.use(bodyParser.json());

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

const connectionUrl = 'mongodb://localhost:27017/jr-ipm';
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

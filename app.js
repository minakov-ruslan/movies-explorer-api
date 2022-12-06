const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { MONGO_URL } = require('./utils/constants');

dotenv.config();
const { PORT = 3000, MONGO = MONGO_URL } = process.env;

const app = express();

mongoose.connect(MONGO);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const appRouter = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');

const { PORT = 3000, NODE_ENV, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  // eslint-disable-next-line no-console
  .then(console.log('MongoDB is connected'));

const app = express();

app.use(helmet());

app.use(cors()); // добавил CORS как мидлвэру, установил и импортировал

app.use(express.json());
app.use(cookieParser());
app.use(limiter); // Apply the rate limiting middleware to all requests.

app.use(requestLogger); // логгер запросов ПЕРЕД всеми роутами.

app.use(appRouter);

app.use(errorLogger); // логгер ошибок между роутерами и обработчиками ошибок
app.use(errors()); // celebrate error handler
app.use(errorHandler); // global error handler and sorter for CAUGHT errors

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} NODE_ENV = ${NODE_ENV}, 'mongoose v.', ${mongoose.version}`);
});

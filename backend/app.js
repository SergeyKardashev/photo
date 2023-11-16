require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// const path = require('path');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { validateLogin, validateCreateUser } = require('./validators/celebrate-validators');
const appRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

// IN CASE THERE IS AN ERROR THAT HASN'T BEEN HANDLED
process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`ОЙ ${origin} ${err.name} c текстом ${err.message} не была обработана. Сработал глобальный обработчик ошибок.`);
});

const { PORT = 3000, NODE_ENV, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
// const { PORT, DB_URL } = process.env; // для тестирования .env

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  // eslint-disable-next-line no-console
  .then(console.log('MongoDB is connected'));

const app = express();

app.use(cors()); // добавил CORS как мидлвэру, установил и импортировал
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(limiter); // Apply the rate limiting middleware to all requests.

// =========== STATIC (start) ===============
app.use(express.static('public'));

// из урока Отдача html и статичных файлов в Express
// app.use(express.static(path.join(__dirname, 'public')));

// подсказка из задания - другой способ (из урока Отдача html и статичных файлов в Express)
// линтер ругается Use path.join() or path.resolve() instead of + to create paths
// app.use(express.static(__dirname + '/public'));

// =========== STATIC (end) ===============

app.use(requestLogger); // логгер запросов ПЕРЕД всеми роутами.

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser); // register

app.use(auth);
app.use(appRouter);

app.use(errorLogger); // логгер ошибок между роутерами и обработчиками ошибок

app.use(errors()); // celebrate error handler
app.use(errorHandler); // global error handler and sorter for CAUGHT errors

app.listen(PORT, () => {
  // console.log('mongoose version', mongoose.version);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} NODE_ENV = ${NODE_ENV}`);

});

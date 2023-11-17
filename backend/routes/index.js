const appRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../validators/celebrate-validators');
const { login, createUser } = require('../controllers/users');
const wrongRequestsRouter = require('./wrong-requests-router');

appRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

appRouter.post('/signin', validateLogin, login);
appRouter.post('/signup', validateCreateUser, createUser);

appRouter.use(auth);

appRouter.get('/signout', (req, res) => { res.clearCookie('jwt').send({ message: 'Выход' }); });
appRouter.use('/users', usersRouter);
appRouter.use('/cards', cardsRouter);
appRouter.use('*', wrongRequestsRouter);

module.exports = appRouter;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET = 'Secret' } = process.env;

// временная мидлвэра на заголовках.
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

// function auth(req, res, next) {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) throw new UnauthorizedError('Необходима авторизация');
//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload;
//     return next();
//   } catch {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }
// }

module.exports = auth;

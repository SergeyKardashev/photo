const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

// const { JWT_SECRET = 'Secret' } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;

// временная мидлвэра на заголовках.
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization is ', authorization);
  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
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
//     const payload = jwt.verify(
//       token,
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//     );
//     req.user = payload;
//     return next();
//   } catch {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }
// }

module.exports = auth;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_JWT } = require('../utils/constants');

const error = new UnauthorizedError('Необходима авторизация');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT);
  } catch (err) {
    return next(error);
  }
  req.user = payload;
  return next();
};

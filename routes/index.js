const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUnloggedUserValidation, getUnregisteredUserValidation } = require('../middlewares/validation');
const { login, createUser, logout } = require('../controllers/users');
const user = require('./users');
const movie = require('./movies');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', getUnloggedUserValidation, login);
router.post('/signup', getUnregisteredUserValidation, createUser);
router.get('/signout', auth, logout);

router.use('/users', auth, user);
router.use('/movies', auth, movie);
router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;

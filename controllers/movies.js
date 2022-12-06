const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .orFail()
    .then((movies) => res.send(movies))
    .catch(next);
};
module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Ошибка валидации'));
      }
      return next(err);
    });
};
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndDelete(req.params._id)
          .then(() => res.send({ message: 'Фильм удалён' }));
      }
      return next(new ForbiddenError('Нет прав на удаление фильма'));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Запрашиваемый фильм не найден'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Неверный запрос. Запрашиваемый фильм не найден'));
      }
      return next(err);
    });
};

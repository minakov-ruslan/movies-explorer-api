const URL = /^https?:\/\/(w{3}.)?([\w-])*\.(\S)*#?$/i;
const DEV_JWT = 'dev-secret';
const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
module.exports = {
  URL,
  DEV_JWT,
  MONGO_URL,
};

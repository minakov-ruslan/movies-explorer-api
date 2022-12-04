const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { getLoggedUserValidation } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', getLoggedUserValidation, updateUserInfo);

module.exports = router;

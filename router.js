const router = require('express').Router();
const userController = require('./controller/userController');
const authenticate = require('./middleware/authenticate');

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/:id', authenticate, userController.profile);

module.exports = router;
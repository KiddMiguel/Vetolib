const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');
const {validateLoginData} = require('../middlewares/middlwareValidateData');


router.post('/auth/login', validateLoginData, userController.login);
router.get('/', middleware.authenticator,userController.getAllUsers);
router.post('/', userController.createUser); 
router.get('/:id', userController.getUserById);
router.put('/:id', middleware.authenticator, userController.updateUser); 
router.delete('/:id', middleware.authenticator, middleware.isAdmin, userController.deleteUser);

module.exports = router;

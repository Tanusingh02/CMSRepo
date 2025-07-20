const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyToken ,verifyAdmin} =require('../middleware/auth');


router.post('/signup', userController.signup)
//router for user login
router.post('/login', userController.loginUser);
//updated latest user and aligned it with authorization and authentication
router.get('/latest-users', verifyToken,verifyAdmin,userController.getLatestUsers);
module.exports = router;
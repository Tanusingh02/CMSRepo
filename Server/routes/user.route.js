const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyToken ,verifyAdmin} =require('../middleware/auth');


router.post('/signup', userController.signup)
//router for user login
router.post('/login', userController.loginUser);

//updated latest user and aligned it with authorization and authentication
router.get('/latest-users', verifyToken,verifyAdmin,userController.getLatestUsers);

//get userinfo through id
router.get("/:id",userController.getUserById);

//edit user route  can only be accessed by admin.
router.put('/:id',verifyToken,verifyAdmin,userController.updateUser);
// user information will be deleted can only be accessed by admin
router.delete('/:id',verifyToken,verifyAdmin,userController.deleteUser);


module.exports = router;
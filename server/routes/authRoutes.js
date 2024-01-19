const express = require('express');
const router = express.Router();
const { loginUser, addUser, getUserDetails, } = require('../controllers/authController');
const isCreater = require('../middleWare/isCreator');
const authenticateUser = require('../middleWare/authMiddleWare');

router.post('/login', loginUser);
router.post('/add-user',authenticateUser ,isCreater,addUser);
router.get('/get-user/:id', authenticateUser,getUserDetails)

module.exports = router;



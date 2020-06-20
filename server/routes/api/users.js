const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require('../../controllers/user-controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getUserInfo', getUserInfo);

module.exports = router;

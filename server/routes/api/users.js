const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserInfo, getAllUsers } = require('../../controllers/user-controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getUserInfo', getUserInfo);
router.get('/allUsers', getAllUsers);

module.exports = router;

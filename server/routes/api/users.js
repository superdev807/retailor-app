const express = require('express');
const router = express.Router();
const { checkAccessToken } = require('../../middlewares/check-token-permission');
const { registerUser, loginUser, getUserInfo, getAllUsers, deleteUser, updateUser } = require('../../controllers/user-controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getUserInfo', getUserInfo);
router.get('/allUsers/:role', getAllUsers);
router.post('/create', checkAccessToken, registerUser);
router.delete('/delete/:id', checkAccessToken, deleteUser);
router.put('/update/:id', checkAccessToken, updateUser);

module.exports = router;

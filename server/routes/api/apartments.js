const express = require('express');
const router = express.Router();
const { checkAccessToken } = require('../../middlewares/check-token-permission');
const { createApartment, readApartments, deleteApartment, updateApartment } = require('../../controllers/apartment-controller');

router.post('/create', checkAccessToken, createApartment);
router.post('/read', checkAccessToken, readApartments);
router.delete('/delete/:id', checkAccessToken, deleteApartment);
router.put('/update/:id', checkAccessToken, updateApartment);

module.exports = router;

const express = require('express');
const router = express.Router();
const { checkAccessToken } = require('../../middlewares/check-token-permission');
const { createApartment, readApartments, deleteApartment } = require('../../controllers/apartment-controller');

router.post('/create', checkAccessToken, createApartment);
router.post('/read', checkAccessToken, readApartments);
router.delete('/delete', checkAccessToken, deleteApartment);

module.exports = router;

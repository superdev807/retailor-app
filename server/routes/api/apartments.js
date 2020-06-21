const express = require('express');
const router = express.Router();
const { checkAccessToken } = require('../../middlewares/check-token-permission');
const { createApartment, readApartments } = require('../../controllers/apartment-controller');

router.post('/create', checkAccessToken, createApartment);
router.post('/read', checkAccessToken, readApartments);

module.exports = router;

const express = require('express');
const router = express.Router();
const { checkAccessToken } = require('../../middlewares/check-token-permission');
const { createApartment } = require('../../controllers/apartment-controller');

router.post('/create', checkAccessToken, createApartment);

module.exports = router;

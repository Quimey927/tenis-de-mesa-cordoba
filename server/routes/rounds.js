const express = require('express');
const router = express.Router();

const { getRoundsOfTheMonth } = require('../controllers/rounds');

router.get('/', getRoundsOfTheMonth);

module.exports = router;

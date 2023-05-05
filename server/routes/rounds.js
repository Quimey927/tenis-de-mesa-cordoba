const express = require('express');
const router = express.Router();

const { getRoundsOfTheMonth, getRound } = require('../controllers/rounds');

router.get('/', getRoundsOfTheMonth);
router.get('/:roundId', getRound);

module.exports = router;

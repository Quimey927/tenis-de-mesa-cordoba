const express = require('express');
const router = express.Router();

const { getRoundsOfTheMonth, getRound } = require('../controllers/rounds');

router.get('/', getRoundsOfTheMonth);
router.get('/:roundName/:tournamentTitle/:season', getRound);

module.exports = router;

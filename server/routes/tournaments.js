const express = require('express');
const router = express.Router();

const { getTournaments, getTournament } = require('../controllers/tournaments');

router.get('/', getTournaments);
router.get('/:tournamentId', getTournament);

module.exports = router;

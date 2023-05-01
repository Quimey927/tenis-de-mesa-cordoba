const express = require('express');
const router = express.Router();

const {
  getTournaments,
  getCurrentTournaments,
  getTournament,
} = require('../controllers/tournaments');

router.get('/', getTournaments);
router.get('/current-tournaments', getCurrentTournaments);
router.get('/:tournamentId', getTournament);

module.exports = router;

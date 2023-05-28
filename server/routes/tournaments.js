const express = require('express');
const router = express.Router();
const {
  getTournaments,
  createTournament,
  getTournamentById,
  getTournamentByTitle,
  updateTournament,
  deleteTournament,
} = require('../controllers/tournaments');

router.route('/').get(getTournaments).post(createTournament);

router
  .route('/:tournamentId')
  .get(getTournamentById)
  .put(updateTournament)
  .delete(deleteTournament);

router.get('/:tournamentTitle/:season', getTournamentByTitle);

module.exports = router;

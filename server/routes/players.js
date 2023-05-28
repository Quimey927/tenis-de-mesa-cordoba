const express = require('express');
const router = express.Router();
const {
  getPlayersNames,
  createPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/players');

router.route('/').get(getPlayersNames).post(createPlayer);

router
  .route('/:playerId')
  .get(getPlayer)
  .put(updatePlayer)
  .delete(deletePlayer);

module.exports = router;

const getPlayersNames =
  'SELECT id, first_name, middle_name, last_name, second_last_name FROM players';

const createPlayer =
  'INSERT INTO players (first_name, middle_name, last_name, second_last_name, birthdate, email, club_name, is_federated, fecoteme_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

const getPlayer = 'SELECT * FROM players WHERE id = $1';

const updatePlayer =
  'UPDATE players SET first_name = $1, middle_name = $2, last_name = $3, second_last_name = $4, birthdate = $5, email = $6, club_name = $7, is_federated = $8, fecoteme_category = $9 WHERE id = $10';

const deletePlayer = 'DELETE FROM players WHERE id = $1';

module.exports = {
  getPlayersNames,
  createPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer,
};

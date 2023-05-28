const getTournaments =
  'SELECT id, title, season, year, tournament_image, start_date, finish_date, description, previous_edition_id, next_edition_id FROM tournaments ORDER BY year DESC';

const createTournament =
  'INSERT INTO tournaments (title, season, year, tournament_image, start_date, finish_date, description, previous_edition_id, next_edition_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

const getTournamentById = 'SELECT * FROM tournaments WHERE id = $1';

const getTournamentByTitle =
  'SELECT * FROM tournaments WHERE (LOWER(title) = LOWER($1)) AND (LOWER(season) = LOWER($2))';

const updateTournament =
  'UPDATE tournaments SET title = $1, season = $2, year = $3, tournament_image = $4, start_date = $5, finish_date = $6, description = $7, previous_edition_id = $8, next_edition_id = $9 WHERE id = $10';

const deleteTournament = 'DELETE FROM tournaments WHERE id = $1';

module.exports = {
  getTournaments,
  createTournament,
  getTournamentById,
  getTournamentByTitle,
  updateTournament,
  deleteTournament,
};

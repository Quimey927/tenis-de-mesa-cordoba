const obtenerClubes = 'SELECT * FROM clubes';

const crearClub =
  'INSERT INTO clubes (nombre, direccion, id_ciudad, escudo_club) VALUES ($1, $2, $3, $4)';

const obtenerClub = 'SELECT * FROM clubes WHERE id = $1';

const editarClub =
  'UPDATE clubes SET nombre = $1, direccion = $2, id_ciudad = $3, escudo_club = $4 WHERE id = $5';

const borrarClub = 'DELETE FROM clubes WHERE id = $1';

module.exports = {
  obtenerClubes,
  crearClub,
  obtenerClub,
  editarClub,
  borrarClub,
};

const obtenerClubes = 'SELECT id, nombre FROM clubes';

const crearClub =
  'INSERT INTO clubes (nombre, direccion, nombre_ciudad, escudo_club) VALUES ($1, $2, $3, $4)';

const obtenerClub = 'SELECT * FROM clubes WHERE nombre = $1';

const editarClub =
  'UPDATE clubes SET nombre = $1, direccion = $2, nombre_ciudad = $3, escudo_club = $4 WHERE nombre = $5';

const borrarClub = 'DELETE FROM clubes WHERE nombre = $1';

module.exports = {
  obtenerClubes,
  crearClub,
  obtenerClub,
  editarClub,
  borrarClub,
};

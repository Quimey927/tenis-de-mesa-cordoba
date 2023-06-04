const obtenerJugadores =
  'SELECT * FROM jugadores ORDER BY apellido, segundo_apellido, nombre, segundo_nombre';

const crearJugador =
  'INSERT INTO jugadores (nombre, segundo_nombre, apellido, segundo_apellido, cumpleaños, email, foto_perfil, nombre_club, es_federado, categoria_fecoteme) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

const obtenerJugador = 'SELECT * FROM jugadores WHERE id = $1';

const editarJugador =
  'UPDATE jugadores SET nombre = $1, segundo_nombre = $2, apellido = $3, segundo_apellido = $4, cumpleaños = $5, email = $6, foto_perfil = $7, nombre_club = $8, es_federado = $9, categoria_fecoteme = $10 WHERE id = $11';

const borrarJugador = 'DELETE FROM jugadores WHERE id = $1';

module.exports = {
  obtenerJugadores,
  crearJugador,
  obtenerJugador,
  editarJugador,
  borrarJugador,
};

const obtenerJugadores =
  'SELECT * FROM jugadores ORDER BY apellido, segundo_apellido, nombre, segundo_nombre';

const crearJugador =
  'INSERT INTO jugadores (nombre, segundo_nombre, apellido, segundo_apellido, fecha_nacimiento, email, foto_perfil, id_club, categoria_fecoteme, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

const obtenerJugador =
  "SELECT *, CONCAT(nombre, ' ', apellido) AS nombre_completo FROM jugadores WHERE id = $1";

const editarJugador =
  'UPDATE jugadores SET nombre = $1, segundo_nombre = $2, apellido = $3, segundo_apellido = $4, fecha_nacimiento = $5, email = $6, foto_perfil = $7, id_club = $8, categoria_fecoteme = $9, slug = $10 WHERE id = $11';

const borrarJugador = 'DELETE FROM jugadores WHERE id = $1';

export default {
  obtenerJugadores,
  crearJugador,
  obtenerJugador,
  editarJugador,
  borrarJugador,
};

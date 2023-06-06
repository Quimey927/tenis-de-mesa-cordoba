const obtenerJugadores =
  'SELECT j.*, c.nombre AS club FROM jugadores AS j LEFT JOIN clubes AS c ON c.id = j.id_club ORDER BY j.apellido, j.segundo_apellido, j.nombre, j.segundo_nombre';

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

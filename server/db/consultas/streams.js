const obtenerStreams =
  'SELECT * FROM streams WHERE id_fecha = $1 ORDER BY orden';

const crearStream =
  'INSERT INTO streams (codigo_embebido, id_fecha, orden) VALUES ($1, $2, $3)';

const obtenerStreamActivo =
  "SELECT s.*, f.nombre AS nombre_fecha, t.titulo AS torneo, t.temporada AS temporada FROM streams AS s INNER JOIN fechas AS f ON f.id = s.id_fecha INNER JOIN torneos AS t ON t.id = f.id_torneo WHERE s.estado = 'a'";

const obtenerStream = 'SELECT * FROM streams WHERE id = $1';

const editarStream =
  'UPDATE streams SET codigo_embebido = $1, id_fecha = $2, orden = $3, estado = $4 WHERE id = $5';

const borrarStream = 'DELETE FROM streams WHERE id = $1';

export default {
  obtenerStreams,
  crearStream,
  obtenerStreamActivo,
  obtenerStream,
  editarStream,
  borrarStream,
};

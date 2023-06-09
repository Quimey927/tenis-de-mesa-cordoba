const obtenerStreams =
  'SELECT * FROM streams WHERE id_fecha = $1 ORDER BY orden';

const crearStream =
  'INSERT INTO streams (url, id_fecha, orden) VALUES ($1, $2, $3)';

const obtenerStream = 'SELECT * FROM streams WHERE id = $1';

const editarStream =
  'UPDATE streams SET url = $1, id_fecha = $2, orden = $3 WHERE id = $4';

const borrarStream = 'DELETE FROM streams WHERE id = $1';

export default {
  obtenerStreams,
  crearStream,
  obtenerStream,
  editarStream,
  borrarStream,
};

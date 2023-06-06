const obtenerTorneos = 'SELECT * FROM torneos ORDER BY año DESC';

const crearTorneo =
  'INSERT INTO torneos (titulo, temporada, año, imagen_torneo, fecha_inicio, fecha_finalizacion, descripcion, id_edicion_previa, id_edicion_siguiente, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

const obtenerTorneo = 'SELECT * FROM torneos WHERE id = $1';

const obtenerTorneoPorSlug = 'SELECT * FROM torneos WHERE slug = $1';

const editarTorneo =
  'UPDATE torneos SET año = $1, imagen_torneo = $2, fecha_inicio = $3, fecha_finalizacion = $4, descripcion = $5, id_edicion_previa = $6, id_edicion_siguiente = $7 WHERE id = $8';

const borrarTorneo = 'DELETE FROM torneos WHERE id = $1';

export default {
  obtenerTorneos,
  crearTorneo,
  obtenerTorneo,
  obtenerTorneoPorSlug,
  editarTorneo,
  borrarTorneo,
};

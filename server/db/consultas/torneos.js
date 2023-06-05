const obtenerTorneos = 'SELECT * FROM torneos ORDER BY año DESC';

const crearTorneo =
  'INSERT INTO torneos (titulo, temporada, año, imagen_torneo, fecha_inicio, fecha_finalizacion, descripcion, id_edicion_previa, id_edicion_siguiente, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

const obtenerTorneo = 'SELECT * FROM torneos WHERE id = $1';

const obtenerTorneoPorSlug = 'SELECT * FROM torneos WHERE slug = $1';

const editarTorneo =
  'UPDATE torneos SET titulo = $1, temporada = $2, año = $3, imagen_torneo = $4, fecha_inicio = $5, fecha_finalizacion = $6, descripcion = $7, id_edicion_previa = $8, id_edicion_siguiente = $9, slug = $10 WHERE id = $11';

const borrarTorneo = 'DELETE FROM torneos WHERE id = $1';

export default {
  obtenerTorneos,
  crearTorneo,
  obtenerTorneo,
  obtenerTorneoPorSlug,
  editarTorneo,
  borrarTorneo,
};

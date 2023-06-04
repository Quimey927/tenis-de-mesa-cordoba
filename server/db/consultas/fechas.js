const obtenerFechas =
  'SELECT id, nombre FROM fechas ORDER BY fecha_inicio DESC';

const obtenerFechasDelMes =
  'SELECT f.nombre AS nombre_fecha, t.titulo AS titulo_torneo, f.fecha_inicio AS fecha_inicio, f.fecha_finalizacion AS fecha_finalizacion, f.nombre_club AS club, t.imagen_torneo AS imagen_torneo, c.direccion AS direccion, f.slug AS slug FROM fechas as f INNER JOIN torneos AS t ON t.id = f.id_torneo INNER JOIN clubes AS c ON c.name = f.nombre_club WHERE (r.fecha_inicio >= $1 AND r.fecha_inicio < $2) OR (r.fecha_finalizacion >= $1 AND r.fecha_finalizacion < $2) ORDER BY r.fecha_inicio';

const crearFecha =
  'INSERT INTO fechas (nombre, num_fecha, id_torneo, nombre_club, fecha_inicio, fecha_finalizacion, id_edicion_previa, id_edicion_siguiente, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

const obtenerFecha = 'SELECT * FROM fechas WHERE id = $1';

const obtenerFechaPorSlug = 'SELECT * FROM fechas WHERE slug = $1';

const editarFecha =
  'UPDATE fechas SET nombre = $1, num_fecha = $2, id_torneo = $3, nombre_club = $4, fecha_inicio = $5, fecha_finalizacion = $6, id_edicion_previa = $7, id_edicion_siguiente = $8, slug = $9 WHERE id = $10';

const borrarFecha = 'DELETE FROM fechas WHERE id = $1';

module.exports = {
  obtenerFechas,
  obtenerFechasDelMes,
  crearFecha,
  obtenerFecha,
  obtenerFechaPorSlug,
  editarFecha,
  borrarFecha,
};

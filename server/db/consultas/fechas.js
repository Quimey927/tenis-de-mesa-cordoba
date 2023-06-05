const obtenerFechas =
  'SELECT f.id AS id, f.nombre AS nombre, t.titulo AS torneo, t.temporada AS temporada, f.id_torneo AS id_torneo, t.slug AS slug_torneo FROM fechas AS f INNER JOIN torneos AS t ON t.id = f.id_torneo ORDER BY f.fecha_inicio DESC';

const obtenerFechasDelMes =
  'SELECT f.nombre AS nombre_fecha, t.titulo AS titulo_torneo, f.fecha_inicio AS fecha_inicio, f.fecha_finalizacion AS fecha_finalizacion, c.nombre AS club, t.imagen_torneo AS imagen_torneo, c.direccion AS direccion, f.slug AS slug FROM fechas as f INNER JOIN torneos AS t ON t.id = f.id_torneo INNER JOIN clubes AS c ON c.id = f.id_club WHERE (f.fecha_inicio >= $1 AND f.fecha_inicio < $2) OR (f.fecha_finalizacion >= $1 AND f.fecha_finalizacion < $2) ORDER BY f.fecha_inicio';

const crearFecha =
  'INSERT INTO fechas (nombre, num_fecha, id_torneo, id_club, fecha_inicio, fecha_finalizacion, slug) VALUES ($1, $2, $3, $4, $5, $6, $7)';

const obtenerFecha = 'SELECT * FROM fechas WHERE id = $1';

const obtenerFechaPorSlug = 'SELECT * FROM fechas WHERE slug = $1';

const editarFecha =
  'UPDATE fechas SET nombre = $1, id_club = $2, fecha_inicio = $3, fecha_finalizacion = $4, slug = $5 WHERE id = $6';

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

const obtenerCategoriasTorneo =
  'SELECT * FROM categorias_torneos WHERE id_torneo = $1 ORDER BY orden';

const crearCategoriaTorneo =
  'INSERT INTO categorias_torneos (categoria, id_torneo, orden) VALUES ($1, $2, $3)';

const obtenerCategoriaTorneo = 'SELECT * FROM categorias_torneos WHERE id = $1';

const editarCategoriaTorneo =
  'UPDATE categorias_torneos SET categoria = $1, id_torneo = $2, orden = $3 WHERE id = $4';

const borrarCategoriaTorneo = 'DELETE FROM categorias_torneos WHERE id = $1';

const obtenerCategoriasTorneoPosibles = `SELECT ct.id, ct.categoria
  FROM categorias_torneos AS ct
  INNER JOIN torneos AS t ON t.id = ct.id_torneo
  INNER JOIN fechas AS f ON f.id_torneo = t.id
  WHERE f.id = $1`;

const obtenerDatosTablaCategoriaTorneo = `SELECT 
    id_jugador,
    posicion,
    puntaje,
    j.nombre AS nombre,
    j.segundo_nombre AS segundo_nombre,
    j.apellido AS apellido,
    j.segundo_apellido AS segundo_apellido,
    f.nombre AS fecha,
    f.num_fecha AS num_fecha
  FROM categorias_fechas_jugadores AS cfj
  INNER JOIN jugadores AS j ON j.id = cfj.id_jugador
  INNER JOIN categorias_fechas AS cf ON cf.id = cfj.id_categoria_fecha
  INNER JOIN fechas AS f ON f.id = cf.id_fecha
  WHERE id_categoria_torneo = $1
  ORDER BY f.num_fecha`;

export default {
  obtenerCategoriasTorneo,
  crearCategoriaTorneo,
  obtenerCategoriaTorneo,
  editarCategoriaTorneo,
  borrarCategoriaTorneo,
  obtenerCategoriasTorneoPosibles,
  obtenerDatosTablaCategoriaTorneo,
};

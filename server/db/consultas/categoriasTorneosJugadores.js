const obtenerJugadoresDeLasCategoriasTorneos =
  'SELECT * FROM categorias_torneos_jugadores';

const obtenerJugadoresDeLaCategoriaTorneo = `SELECT
    ctj.id AS id,
    ctj.posicion AS posicion,
    ctj.puntaje_total AS puntaje_total,
    j.id AS id_jugador,
    j.nombre AS nombre,
    j.segundo_nombre AS segundo_nombre,
    j.apellido AS apellido,
    j.segundo_apellido AS segundo_apellido
  FROM jugadores AS j
  INNER JOIN categorias_torneos_jugadores AS ctj ON ctj.id_jugador = j.id
  LEFT JOIN categorias_torneos AS ct ON ct.id = ctj.id_categoria_torneo
  WHERE ct.id = $1
  ORDER BY ctj.posicion`;

const agregarJugadorACategoriaTorneo = `INSERT INTO categorias_torneos_jugadores
    (id_categoria_torneo, id_jugador)
  VALUES ($1, $2)`;

const editarPosicionYPuntajeCategoriaTorneo = `UPDATE categorias_torneos_jugadores
  SET
    posicion = $1,
    puntaje_total = $2
  WHERE id = $3 `;

const crearNuevoJugadorCategoriaTorneo = `INSERT INTO categorias_torneos_jugadores
(id_jugador, id_categoria_torneo)
VALUES ($1, $2)`;

const borrarJugadorDeCategoriaTorneo =
  'DELETE FROM categorias_torneos_jugadores WHERE id = $1';

export default {
  obtenerJugadoresDeLasCategoriasTorneos,
  obtenerJugadoresDeLaCategoriaTorneo,
  agregarJugadorACategoriaTorneo,
  editarPosicionYPuntajeCategoriaTorneo,
  crearNuevoJugadorCategoriaTorneo,
  borrarJugadorDeCategoriaTorneo,
};

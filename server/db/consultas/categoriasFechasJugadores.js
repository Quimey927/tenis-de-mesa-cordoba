const agregarJugadoresACategoriaFecha = (cant_jugadores) => {
  let valoresConsulta = '';

  for (let i = 0; i < cant_jugadores; i++) {
    valoresConsulta += `($1, $${i + 3}, $2), `;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO categorias_fechas_jugadores
    (id_categoria_fecha, id_jugador, id_categoria_torneo)
    VALUES ${valoresConsultaAjustado}`;

  return consulta;
};

const obtenerJugadoresDeLaCategoriaFecha = `SELECT
    cfj.id AS id,
    ct.categoria AS categoria,
    j.id AS id_jugador,
    cfj.posicion AS posicion,
    cfj.puntaje AS puntaje,
    cfj.id_categoria_torneo,
    j.nombre AS nombre,
    j.segundo_nombre AS segundo_nombre,
    j.apellido AS apellido,
    j.segundo_apellido AS segundo_apellido
  FROM jugadores AS j
  INNER JOIN categorias_fechas_jugadores AS cfj ON cfj.id_jugador = j.id
  INNER JOIN categorias_fechas AS cf ON cfj.id_categoria_fecha = cf.id
  INNER JOIN categorias_torneos AS ct ON ct.id = cfj.id_categoria_torneo
  WHERE cf.id = $1
  ORDER BY cfj.posicion`;

const editarPosicionYPuntaje = `UPDATE categorias_fechas_jugadores
  SET
    posicion = $1,
    puntaje = $2,
    id_categoria_torneo = $3
  WHERE id = $4 `;

const borrarJugadorDeCategoriaFecha =
  'DELETE FROM categorias_fechas_jugadores WHERE id = $1';

const crearNuevoJugador = `INSERT INTO categorias_fechas_jugadores
(id_categoria_fecha, id_jugador)
VALUES ($1, $2)`;

export default {
  agregarJugadoresACategoriaFecha,
  obtenerJugadoresDeLaCategoriaFecha,
  editarPosicionYPuntaje,
  borrarJugadorDeCategoriaFecha,
  crearNuevoJugador,
};

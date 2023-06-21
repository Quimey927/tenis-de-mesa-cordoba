const obtenerPartidosDelGrupo = `SELECT
    part.*,
    j1.nombre AS jugador_1_nombre,
    j1.apellido AS jugador_1_apellido,
    j1.segundo_nombre AS jugador_1_segundo_nombre,
    j1.segundo_apellido AS jugador_1_segundo_apellido,
    j2.nombre AS jugador_2_nombre,
    j2.apellido AS jugador_2_apellido,
    j2.segundo_nombre AS jugador_2_segundo_nombre,
    j2.segundo_apellido AS jugador_2_segundo_apellido
  FROM partidos AS part
  LEFT JOIN sets AS set ON set.id_partido = part.id
  INNER JOIN jugadores AS j1 ON j1.id = part.id_jugador_1
  INNER JOIN jugadores AS j2 ON j2.id = part.id_jugador_2
  WHERE id_grupo = $1
  GROUP BY j1.nombre, j1.apellido, j1.segundo_nombre, j1.segundo_apellido, j2.nombre, j2.apellido, j2.segundo_nombre, j2.segundo_apellido, part.id
  ORDER BY part.orden`;

const crearPartidosDelGrupo = (jugadores) => {
  let valoresConsulta = '';

  let orden = 1;

  for (let i = 0; i < jugadores.length - 1; i++) {
    for (let j = i + 1; j < jugadores.length; j++) {
      valoresConsulta += `($1, $2, ${orden}, 'Grupos', ${jugadores[i]}, ${jugadores[j]}), `;
      orden++;
    }
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO partidos (id_grupo, fecha, orden, instancia, id_jugador_1, id_jugador_2) VALUES ${valoresConsultaAjustado};`;

  return consulta;
};

const intercambiarJugadoresPartido = `UPDATE partidos
  SET
    (id_jugador_1, id_jugador_2) = (id_jugador_2, id_jugador_1)
  WHERE id = $1`;

const editarOrdenPartido = 'UPDATE partidos SET orden = $1 WHERE id = $2';

export default {
  obtenerPartidosDelGrupo,
  crearPartidosDelGrupo,
  intercambiarJugadoresPartido,
  editarOrdenPartido,
};

const obtenerPartidosDelGrupo = `SELECT
    part.*,
    CONCAT(j1.nombre, ' ', j1.apellido) AS jugador_1,
    CONCAT(j2.nombre, ' ', j2.apellido) AS jugador_2
  FROM partidos AS part
  INNER JOIN sets AS set ON set.id_partido = part.id
  INNER JOIN jugadores AS j1 ON j1.id = part.id_jugador_1
  INNER JOIN jugadores AS j2 ON j2.id = part.id_jugador_2
  WHERE id_grupo = $1
  GROUP BY j1.nombre, j1.apellido, j2.nombre, j2.apellido, part.id`;

export default {
  obtenerPartidosDelGrupo,
};

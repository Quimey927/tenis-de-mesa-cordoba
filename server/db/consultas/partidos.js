const obtenerPartidosDelGrupo = `SELECT
    part.*,
    j1.nombre AS jugador_1,
    j2.nombre AS jugador_2,
  FROM partidos AS part
  INNER JOIN sets AS set ON set.partido_id = part.id
  INNER JOIN jugador AS j1 ON j1.id = part.id_jugador_1
  INNER JOIN jugador AS j2 ON j2.id = part.id_jugador_2
  WHERE id_grupo = $1
  GROUP BY j1.nombre, j2.nombre, part.id`;

export default {
  obtenerPartidosDelGrupo,
};

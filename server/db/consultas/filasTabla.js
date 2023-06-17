const obtenerFilasTabla = `SELECT
    t.*,
    p.nombre AS jugador
  FROM filas_posicion_grupos AS t
  INNER JOIN grupos AS g ON g.id = t.liga_id
  INNER JOIN jugadores AS p ON t.id_jugador = p.id
  WHERE l.id = $1
  ORDER BY t.posicion`;

export default { obtenerFilasTabla };

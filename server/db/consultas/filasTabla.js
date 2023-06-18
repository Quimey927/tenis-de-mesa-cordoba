const obtenerFilasTabla = `SELECT
    p.*,
    j.nombre AS jugador
  FROM filas_posicion_grupos AS p
  INNER JOIN grupos AS g ON g.id = p.id_grupo
  INNER JOIN jugadores AS j ON p.id_jugador = j.id
  WHERE p.id = $1
  ORDER BY p.posicion`;

export default { obtenerFilasTabla };

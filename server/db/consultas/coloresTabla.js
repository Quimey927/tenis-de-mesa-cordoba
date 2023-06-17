const obtenerColoresTabla = `SELECT
    cf.acotacion,
    cf.color,
    cf.id, 
    cf.posiciones
  FROM colores_filas AS cf
  INNER JOIN grupos AS g ON cf.id_grupo = g.id
  WHERE g.id = $1`;

export default { obtenerColoresTabla };

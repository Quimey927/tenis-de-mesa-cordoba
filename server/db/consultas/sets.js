const obtenerSetsDelGrupo = `SELECT
    s.*,
    j1.id AS id_jugador_1,
    j2.id AS id_jugador_2
  FROM sets AS s
  INNER JOIN partidos AS p ON p.id = s.id_partido
  LEFT JOIN jugadores AS j1 ON j1.id = p.id_jugador_1
  LEFT JOIN jugadores AS j2 ON j2.id = p.id_jugador_2
  INNER JOIN grupos AS g ON p.id_grupo = g.id
  WHERE g.id = $1`;

const obtenerSetsDeLaEliminatoria = `SELECT s.*
  FROM sets AS s
  INNER JOIN partidos AS p ON p.id = s.id_partido
  INNER JOIN eliminatorias AS e ON p.id_eliminatoria = e.id
  WHERE e.id = $1`;

const editarSet = `UPDATE sets
  SET
    puntos_jugador_1 = $1,
    puntos_jugador_2 = $2
  WHERE id = $3`;

const crearSetsPartido = () => {
  let valoresConsulta = '';

  for (let i = 0; i < 7; i++) {
    valoresConsulta += `($1, ${i + 1}), `;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO sets
    (
      id_partido,
      num_set
    )
  VALUES ${valoresConsultaAjustado}`;

  return consulta;
};

export default {
  obtenerSetsDelGrupo,
  obtenerSetsDeLaEliminatoria,
  editarSet,
  crearSetsPartido,
};

const obtenerPartidosDelGrupo = `SELECT
    part.*,
    j1.nombre AS jugador_1_nombre,
    j1.apellido AS jugador_1_apellido,
    j1.segundo_nombre AS jugador_1_segundo_nombre,
    j1.segundo_apellido AS jugador_1_segundo_apellido,
    j2.nombre AS jugador_2_nombre,
    j2.apellido AS jugador_2_apellido,
    j2.segundo_nombre AS jugador_2_segundo_nombre,
    j2.segundo_apellido AS jugador_2_segundo_apellido,
    SUM(set.puntos_jugador_1) AS puntos_jugador_1,
    SUM(set.puntos_jugador_2) AS puntos_jugador_2
  FROM partidos AS part
  LEFT JOIN sets AS set ON set.id_partido = part.id
  LEFT JOIN jugadores AS j1 ON j1.id = part.id_jugador_1
  LEFT JOIN jugadores AS j2 ON j2.id = part.id_jugador_2
  WHERE id_grupo = $1
  GROUP BY j1.nombre, j1.apellido, j1.segundo_nombre, j1.segundo_apellido, j2.nombre, j2.apellido, j2.segundo_nombre, j2.segundo_apellido, part.id
  ORDER BY part.num_fecha, part.orden, part.id`;

const crearPartidosDelGrupo = (cant_partidos) => {
  let valoresConsulta = '';

  let orden = 1;

  for (let i = 0; i < cant_partidos; i++) {
    valoresConsulta += `($1, $2, ${orden}, $${2 * i + 3}, $${2 * i + 4}), `;
    orden++;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO partidos (id_grupo, fecha, orden, id_jugador_1, id_jugador_2) VALUES ${valoresConsultaAjustado} RETURNING id`;

  return consulta;
};

const crearPartidosDelGrupoConFecha = (cantFechas, cantPartidosPorFecha) => {
  let valoresConsulta = '';

  for (let i = 0; i < cantFechas; i++) {
    for (let j = 0; j < cantPartidosPorFecha; j++) {
      valoresConsulta += `($1, $2, ${i + 1}, ${j + 1}), `;
    }
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO partidos (id_grupo, fecha, num_fecha, orden) VALUES ${valoresConsultaAjustado} RETURNING id`;

  return consulta;
};

const editarPartido = `UPDATE partidos
  SET
    num_fecha = $1,
    orden = $2,
    sets_jugador_1 = $3,
    sets_jugador_2 = $4,
    id_jugador_1 = $5,
    id_jugador_2 = $6
  WHERE id = $7`;

const editarResultadoPartido = `UPDATE partidos
  SET
    sets_jugador_1 = $1,
    sets_jugador_2 = $2
  WHERE id = $3`;

const obtenerPartidosDeLaEliminatoria = `SELECT
    part.*,
    j1.nombre AS jugador_1_nombre,
    j1.apellido AS jugador_1_apellido,
    j1.segundo_nombre AS jugador_1_segundo_nombre,
    j1.segundo_apellido AS jugador_1_segundo_apellido,
    j2.nombre AS jugador_2_nombre,
    j2.apellido AS jugador_2_apellido,
    j2.segundo_nombre AS jugador_2_segundo_nombre,
    j2.segundo_apellido AS jugador_2_segundo_apellido,
    SUM(set.puntos_jugador_1) AS puntos_jugador_1,
    SUM(set.puntos_jugador_2) AS puntos_jugador_2
  FROM partidos AS part
  LEFT JOIN sets AS set ON set.id_partido = part.id
  LEFT JOIN jugadores AS j1 ON j1.id = part.id_jugador_1
  LEFT JOIN jugadores AS j2 ON j2.id = part.id_jugador_2
  WHERE id_eliminatoria = $1
  GROUP BY j1.nombre, j1.apellido, j1.segundo_nombre, j1.segundo_apellido, j2.nombre, j2.apellido, j2.segundo_nombre, j2.segundo_apellido, part.id
  ORDER BY part.orden DESC`;

const crearPartidosDeLaEliminatoria = (cant_partidos, hay_tercer_puesto) => {
  let valoresConsulta = '';

  for (let i = 0; i < cant_partidos; i++) {
    valoresConsulta += `($1, $2, ${i + 1}), `;
  }

  if (hay_tercer_puesto) {
    valoresConsulta += `($1, $2, 0), `;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO partidos (id_eliminatoria, fecha, orden) VALUES ${valoresConsultaAjustado} RETURNING id`;

  return consulta;
};

const borrarPartido = 'DELETE FROM partidos WHERE id = $1';

const crearPartido = `INSERT INTO partidos
  (
    fecha,
    id_grupo,
    id_eliminatoria
  )
  VALUES ($1, $2, $3)
  RETURNING id`;

export default {
  obtenerPartidosDelGrupo,
  crearPartidosDelGrupo,
  crearPartidosDelGrupoConFecha,
  editarPartido,
  editarResultadoPartido,
  obtenerPartidosDeLaEliminatoria,
  crearPartidosDeLaEliminatoria,
  borrarPartido,
  crearPartido,
};

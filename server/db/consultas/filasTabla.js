const obtenerFilasTabla = `SELECT
    ft.*,
    j.nombre AS nombre,
    j.segundo_nombre AS segundo_nombre,
    j.apellido AS apellido,
    j.segundo_apellido AS segundo_apellido
  FROM filas_tabla AS ft
  INNER JOIN grupos AS g ON g.id = ft.id_grupo
  INNER JOIN jugadores AS j ON ft.id_jugador = j.id
  WHERE ft.id_grupo = $1
  ORDER BY ft.posicion`;

const agregarJugadores = (cant_jugadores) => {
  let valoresConsulta = '';

  for (let i = 0; i < cant_jugadores; i++) {
    valoresConsulta += `($1, $${i + 2}), `;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO filas_tabla (id_grupo, id_jugador) VALUES ${valoresConsultaAjustado};`;

  console.log(consulta);

  return consulta;
};

export default { obtenerFilasTabla, agregarJugadores };

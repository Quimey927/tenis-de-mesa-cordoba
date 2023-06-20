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

const crearFilasTabla = (cant_jugadores) => {
  let valoresConsulta = '';

  for (let i = 0; i < cant_jugadores; i++) {
    valoresConsulta += `($1, $${i + 2}, ${i + 1}, ${i + 1}), `;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO filas_tabla (id_grupo, id_jugador, posicion, preclasificado) VALUES ${valoresConsultaAjustado};`;

  return consulta;
};

const editarFilaTabla = `UPDATE filas_tabla
  SET
    posicion = $1,
    pj = $2,
    pg = $3,
    pp = $4,
    sf = $5,
    sc = $6,
    pf = $7,
    pc = $8
  WHERE id = $9`;

export default { obtenerFilasTabla, crearFilasTabla, editarFilaTabla };

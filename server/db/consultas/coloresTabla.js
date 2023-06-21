const obtenerColoresTabla = `SELECT
    cf.nota,
    cf.color,
    cf.id, 
    cf.posiciones
  FROM colores_filas AS cf
  INNER JOIN grupos AS g ON cf.id_grupo = g.id
  WHERE g.id = $1`;

const crearColoresTabla = (cant_colores, cant_grupos) => {
  let valoresConsulta = '';

  for (let i = 0; i < cant_grupos; i++) {
    for (let j = 0; j < cant_colores; j++) {
      valoresConsulta += `($${i + 1}, $${cant_grupos + 3 * j + 1}, $${
        cant_grupos + 3 * j + 2
      }, $${cant_grupos + 3 * j + 3}), `;
    }
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO colores_filas (id_grupo, posiciones, color, nota) VALUES ${valoresConsultaAjustado};`;

  return consulta;
};

const editarColorTabla = `UPDATE colores_filas
  SET
    posiciones = $1,
    color = $2,
    nota = $3
  WHERE id = $4`;

const borrarColorTabla = 'DELETE FROM colores_filas WHERE id = $1';

const crearColorTabla =
  'INSERT INTO colores_filas (id_grupo, posiciones, color, nota) VALUES ($1, $2, $3, $4)';

export default {
  obtenerColoresTabla,
  crearColoresTabla,
  editarColorTabla,
  borrarColorTabla,
  crearColorTabla,
};

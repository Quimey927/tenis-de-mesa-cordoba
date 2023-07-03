const obtenerGrupos = `SELECT 
    g.*,
    cf.dia AS dia
  FROM grupos AS g
  INNER JOIN fases AS f ON f.id = g.id_fase
  INNER JOIN categorias_fechas AS cf ON cf.id = f.id_categoria_fecha
  WHERE g.id_fase = $1
  ORDER BY g.id`;

const crearGrupo = `INSERT INTO grupos
  (
    nombre,
    id_fase
  )
  VALUES ($1, $2)`;

const crearGrupos = (cant_grupos) => {
  let valoresConsulta = '';

  for (let i = 0; i < cant_grupos; i++) {
    valoresConsulta += `($${i + 2}, $1), `;
  }

  const valoresConsultaAjustado = valoresConsulta.substring(
    0,
    valoresConsulta.length - 2
  );

  let consulta = `INSERT INTO grupos (nombre, id_fase) VALUES ${valoresConsultaAjustado};`;

  return consulta;
};

const obtenerGrupo = 'SELECT * FROM grupos WHERE id = $1';

const editarGrupo = `UPDATE grupos
  SET
    nombre = $1
  WHERE id = $2`;

const borrarGrupo = 'DELETE FROM grupos WHERE id = $1';

export default {
  obtenerGrupos,
  crearGrupo,
  crearGrupos,
  obtenerGrupo,
  editarGrupo,
  borrarGrupo,
};

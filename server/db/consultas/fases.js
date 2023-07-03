const obtenerFases = `SELECT
    f.*,
    MIN(g.id) AS id_grupo,
    MIN(e.id) AS id_eliminatoria
  FROM fases AS f
  LEFT JOIN grupos AS g ON g.id_fase = f.id
  LEFT JOIN eliminatorias AS e ON e.id_fase = f.id
  WHERE f.id_categoria_fecha = $1
  GROUP BY f.id`;

const crearFase = `INSERT INTO fases
  (
    nombre,
    orden,
    tipo,
    id_categoria_fecha
  )
  VALUES ($1, $2, $3, $4)`;

const obtenerFase = 'SELECT * FROM fases WHERE id = $1';

const editarFase = `UPDATE fases
  SET
    nombre = $1,
    orden = $2 
  WHERE id = $3`;

const borrarFase = 'DELETE FROM fases WHERE id = $1';

export default { obtenerFases, crearFase, obtenerFase, editarFase, borrarFase };

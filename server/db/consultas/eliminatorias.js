const obtenerEliminatorias = `SELECT 
    f.*,
    cf.dia AS dia
  FROM eliminatorias AS e
  INNER JOIN fases AS f ON f.id = e.id_fase
  INNER JOIN categorias_fechas AS cf ON cf.id = f.id_categoria_fecha
  WHERE e.id_fase = $1`;

('SELECT * FROM eliminatorias WHERE id_fase = $1');

const crearEliminatoria = `INSERT INTO eliminatorias
  (
    id_fase
  )
  VALUES ($1)
  RETURNING id`;

const obtenerEliminatoria = 'SELECT * FROM eliminatorias WHERE id = $1';

export default {
  obtenerEliminatorias,
  crearEliminatoria,
  obtenerEliminatoria,
};

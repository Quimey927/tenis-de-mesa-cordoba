const obtenerCategoriasFecha =
  'SELECT * FROM categorias_fechas WHERE id_fecha = $1 ORDER BY orden';

const crearCategoriaFecha = `INSERT INTO categorias_fechas
  (
    categoria,
    id_fecha,
    orden,
    dia
  ) 
  VALUES ($1, $2, $3, $4)`;

const obtenerCategoriaFecha = `SELECT
    cf.*,
    f.nombre AS fecha
  FROM categorias_fechas AS cf
  INNER JOIN fechas AS f ON f.id = cf.id_fecha
  WHERE cf.id = $1`;

const editarCategoriaFecha = `UPDATE categorias_fechas
  SET
    categoria = $1,
    id_fecha = $2,
    orden = $3,
    dia = $4
  WHERE id = $5`;

const borrarCategoriaFecha = 'DELETE FROM categorias_fechas WHERE id = $1';

export default {
  obtenerCategoriasFecha,
  crearCategoriaFecha,
  obtenerCategoriaFecha,
  editarCategoriaFecha,
  borrarCategoriaFecha,
};

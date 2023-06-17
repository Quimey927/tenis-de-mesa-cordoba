const obtenerFases = 'SELECT * FROM fases WHERE id_categoria_fecha = $1';

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

const obtenerGrupos = 'SELECT * FROM grupos WHERE id_fase = $1 ORDER BY nombre';

const crearGrupo = `INSERT INTO grupos
  (
    nombre,
    id_fase
  )
  VALUES ($1, $2)`;

const obtenerGrupo = 'SELECT * FROM grupos WHERE id = $1';

const editarGrupo = `UPDATE grupos
  SET
    nombre = $1,
  WHERE id = $2`;

const borrarGrupo = 'DELETE FROM grupos WHERE id = $1';

export default {
  obtenerGrupos,
  crearGrupo,
  obtenerGrupo,
  editarGrupo,
  borrarGrupo,
};

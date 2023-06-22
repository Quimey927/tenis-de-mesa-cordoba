const obtenerSets = 'SELECT * FROM sets WHERE id_partido $ $1';

const editarSet = `UPDATE sets
  SET
    num_set = $1,
    puntos_jugador_1 = $2,
    puntos_jugador_2 = $3
  WHERE id = $4`;

const borrarSet = 'DELETE FROM sets WHERE id = $1';

const crearSet = `INSERT INTO sets
  (
    id_partido,
    num_set,
    puntos_jugador_1,
    puntos_jugador_2
  )
  VALUES ($1, $2, $3, $4)`;

export default { obtenerSets, editarSet, borrarSet, crearSet };

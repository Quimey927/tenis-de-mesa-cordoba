const obtenerSets = 'SELECT * FROM sets WHERE id_partido = $1 ORDER BY num_set';

const editarSet = `UPDATE sets
  SET
    num_set = $1,
    puntos_jugador_1 = $2,
    puntos_jugador_2 = $3
  WHERE id = $4`;

const borrarSet = 'DELETE FROM sets WHERE id = $1';

const crearSet = (cantSets) => {
  return `INSERT INTO sets
    (
      id_partido,
      num_set,
      puntos_jugador_1,
      puntos_jugador_2
    )
    VALUES ($1, ${+cantSets + 1}, ${0}, ${0})`;
};

export default { obtenerSets, editarSet, borrarSet, crearSet };

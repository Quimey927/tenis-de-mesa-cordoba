import pool from '../db/db.js';
import consultasPartidos from '../db/consultas/partidos.js';

export const obtenerPartidosDelGrupo = async (req, res) => {
  const id = parseInt(req.params.idGrupo);

  try {
    pool.query(
      consultasPartidos.obtenerPartidosDelGrupo,
      [id],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los partidos del grupo.');
  }
};

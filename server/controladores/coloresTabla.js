import pool from '../db/db.js';
import consultasColoresTabla from '../db/consultas/coloresTabla.js';

export const obtenerColoresTabla = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);

  try {
    pool.query(
      consultasColoresTabla.obtenerColoresTabla,
      [idGrupo],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los colores de la tabla.');
  }
};

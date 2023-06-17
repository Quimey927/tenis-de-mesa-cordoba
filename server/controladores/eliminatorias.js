import pool from '../db/db.js';
import consultasEliminatorias from '../db/consultas/eliminatorias.js';

export const obtenerEliminatorias = async (req, res) => {
  const idFase = parseInt(req.params.idFase);

  try {
    pool.query(
      consultasEliminatorias.obtenerEliminatorias,
      [idFase],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar las eliminatorias.');
  }
};

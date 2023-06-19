import pool from '../db/db.js';
import consultasFilasTabla from '../db/consultas/filasTabla.js';

export const obtenerFilasTabla = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);

  try {
    pool.query(
      consultasFilasTabla.obtenerFilasTabla,
      [idGrupo],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar las filas de la tabla.');
  }
};

export const agregarJugadores = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);
  const idJugadores = req.body;

  try {
    pool.query(
      consultasFilasTabla.agregarJugadores(idJugadores.length),
      [idGrupo, ...idJugadores],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar las filas de la tabla.');
  }
};

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

export const crearFilasTabla = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);
  const idJugadores = req.body;

  try {
    pool.query(
      consultasFilasTabla.crearFilasTabla(idJugadores.length),
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

export const editarFilaTabla = async (req, res) => {
  const idFila = parseInt(req.params.idFila);
  const { posicion, pj, pg, pp, sf, sc, pf, pc } = req.body;

  try {
    pool.query(
      consultasFilasTabla.editarFilaTabla,
      [+posicion, +pj, +pg, +pp, +sf, +sc, +pf, +pc, idFila],
      (err, results) => {
        if (err) throw new Error();
        res.status(200).send('Fila de tabla editada correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar la fila de la tabla.');
  }
};

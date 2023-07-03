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

export const crearEliminatoria = async (req, res) => {
  const { descripcion, idFase } = req.body;

  try {
    pool.query(
      consultasEliminatorias.crearEliminatoria,
      [descripcion, idFase],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'No pudimos crear la eliminatoria.' });
  }
};

export const editarEliminatoria = async (req, res) => {
  const idEliminatoria = parseInt(req.params.idEliminatoria);

  const { descripcion } = req.body;

  try {
    pool.query(
      consultasEliminatorias.obtenerEliminatoria,
      [idEliminatoria],
      (err, results) => {
        if (err) throw new Error(err);

        const eliminatoriaNoEncontrada = !results.rows.length;

        if (eliminatoriaNoEncontrada) {
          res
            .status(200)
            .send('La eliminatoria no existe en la base de datos.');
        }

        pool.query(
          consultasEliminatorias.editarEliminatoria,
          [descripcion, idEliminatoria],
          (err, results) => {
            if (err) throw new Error();
            res.status(200).send('Eliminatoria editada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar la eliminatoria.');
  }
};

export const obtenerEliminatoria = async (req, res) => {
  const idEliminatoria = parseInt(req.params.idEliminatoria);

  try {
    pool.query(
      consultasEliminatorias.obtenerEliminatoria,
      [idEliminatoria],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar la eliminatoria.');
  }
};

import pool from '../db/db.js';
import consultasSets from '../db/consultas/sets.js';

export const obtenerSetsDelGrupo = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);

  try {
    pool.query(consultasSets.obtenerSetsDelGrupo, [idGrupo], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los sets del grupo.');
  }
};

export const obtenerSetsDeLaEliminatoria = async (req, res) => {
  const idEliminatoria = parseInt(req.params.idEliminatoria);

  try {
    pool.query(
      consultasSets.obtenerSetsDeLaEliminatoria,
      [idEliminatoria],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los sets de la eliminatoria.');
  }
};

export const editarSet = async (req, res) => {
  const idSet = parseInt(req.params.idSet);
  const { puntos_jugador_1, puntos_jugador_2 } = req.body;

  try {
    pool.query(
      consultasSets.editarSet,
      [puntos_jugador_1, puntos_jugador_2, idSet],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send({ message: 'Set editado exitosamente.' });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'No pudimos editar el set.' });
  }
};

export const crearSetsPartido = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  try {
    pool.query(
      consultasSets.crearSetsPartido(),
      [idPartido],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Sets creados correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear los sets del partido.');
  }
};

import pool from '../db/db.js';
import consultasSets from '../db/consultas/sets.js';

export const obtenerSets = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  try {
    pool.query(consultasSets.obtenerSets, [idPartido], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los sets del partido.');
  }
};

export const editarSet = async (req, res) => {
  const idSet = parseInt(req.params.idSet);
  const { num_set, puntos_jugador_1, puntos_jugador_2 } = req.body;

  try {
    pool.query(
      consultasSets.editarSet,
      [num_set, puntos_jugador_1, puntos_jugador_2, idSet],
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

export const borrarSet = async (req, res) => {
  const idSet = parseInt(req.params.idSet);

  try {
    pool.query(consultasSets.borrarSet, [idSet], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).send('Set eliminado correctamente.');
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el set.');
  }
};

export const crearSet = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);
  const { cantSets } = req.body;

  try {
    pool.query(
      consultasSets.crearSet(cantSets),
      [idPartido],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Color creado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el color.');
  }
};

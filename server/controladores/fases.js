import pool from '../db/db.js';
import consultasFases from '../db/consultas/fases.js';

export const obtenerFases = async (req, res) => {
  const idCategoriaFecha = parseInt(req.params.idCategoriaFecha);

  try {
    pool.query(
      consultasFases.obtenerFases,
      [idCategoriaFecha],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar las fases.');
  }
};

export const crearFase = async (req, res) => {
  const { nombre, orden, tipo, id_categoria_fecha } = req.body;

  try {
    pool.query(
      consultasFases.crearFase,
      [nombre, orden, tipo, id_categoria_fecha],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'No pudimos crear la fase.' });
  }
};

export const obtenerFase = async (req, res) => {
  const id = parseInt(req.params.idFase);

  try {
    pool.query(consultasFases.obtenerFase, [id], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar la fase.');
  }
};

export const editarFase = async (req, res) => {
  const id = parseInt(req.params.idFase);
  const { nombre, orden } = req.body;

  try {
    pool.query(consultasFases.obtenerFase, [id], (err, results) => {
      if (err) throw new Error(err);

      const faseNoEncontrada = !results.rows.length;

      if (faseNoEncontrada) {
        res.status(200).send('La fase no existe en la base de datos.');
      }

      pool.query(
        consultasFases.editarFase,
        [nombre, orden, id],
        (err, results) => {
          if (err) throw new Error();
          res.status(200).send('Fase editada correctamente.');
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar la fase.');
  }
};

export const borrarFase = async (req, res) => {
  const id = parseInt(req.params.idFase);

  try {
    pool.query(consultasFases.obtenerFase, [id], (err, results) => {
      if (err) throw new Error(err);

      const faseNoEncontrada = !results.rows.length;

      if (faseNoEncontrada) {
        res.status(200).send('La fase no existe en la base de datos.');
      }

      pool.query(consultasFases.borrarFase, [id], (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Fase eliminada correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar la fase.');
  }
};

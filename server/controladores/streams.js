import pool from '../db/db.js';
import consultasStreams from '../db/consultas/streams.js';

export const obtenerStreams = async (req, res) => {
  const idFecha = parseInt(req.params.idFecha);

  try {
    pool.query(consultasStreams.obtenerStreams, [idFecha], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los streams.');
  }
};

export const crearStream = async (req, res) => {
  const { codigo_embebido, id_fecha, orden, estado } = req.body;

  try {
    pool.query(
      consultasStreams.crearStream,
      [codigo_embebido, id_fecha, orden, estado],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send('Stream creado exitosamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el stream.');
  }
};

export const obtenerStreamActivo = async (req, res) => {
  try {
    pool.query(consultasStreams.obtenerStreamActivo, (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el stream activo.');
  }
};

export const obtenerStream = async (req, res) => {
  const id = parseInt(req.params.idStream);

  try {
    pool.query(consultasStreams.obtenerStream, [id], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el stream.');
  }
};

export const editarStream = async (req, res) => {
  const id = parseInt(req.params.idStream);
  const { codigo_embebido, id_fecha, orden, estado } = req.body;

  try {
    pool.query(consultasStreams.obtenerStream, [id], (err, results) => {
      if (err) throw new Error(err);

      const streamNoEncontrado = !results.rows.length;

      if (streamNoEncontrado) {
        res.status(200).send('El stream no existe en la base de datos.');
      }

      pool.query(
        consultasStreams.editarStream,
        [codigo_embebido, id_fecha, orden, estado, id],
        (err, results) => {
          if (err) throw new Error(err);
          res.status(200).send('Stream editado correctamente.');
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar el stream.');
  }
};

export const borrarStream = async (req, res) => {
  const id = parseInt(req.params.idStream);

  try {
    pool.query(consultasStreams.obtenerStream, [id], (err, results) => {
      if (err) throw new Error(err);

      const streamNoEncontrado = !results.rows.length;

      if (streamNoEncontrado) {
        res.status(200).send('El stream no existe en la base de datos.');
      }

      pool.query(consultasStreams.borrarStream, [id], (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Stream eliminado correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el stream.');
  }
};

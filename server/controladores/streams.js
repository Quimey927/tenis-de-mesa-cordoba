import pool from '../db/db.js';
import consultasStreams from '../db/consultas/streams.js';

export const obtenerStreams = async (req, res) => {
  const idFecha = parseInt(req.params.idFecha);

  try {
    pool.query(consultasStreams.obtenerStreams, [idFecha], (err, results) => {
      if (err) throw new Error('No pudimos cargar los streams.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const crearStream = async (req, res) => {
  const { codigo_embebido, id_fecha, orden, estado } = req.body;

  try {
    pool.query(
      consultasStreams.crearStream,
      [codigo_embebido, id_fecha, orden, estado],
      (err, results) => {
        if (err) throw new Error('No pudimos crear el stream.');
        res.status(201).send('Stream creado exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const obtenerStreamActivo = async (req, res) => {
  try {
    pool.query(consultasStreams.obtenerStreamActivo, (err, results) => {
      if (err) throw new Error('No pudimos encontrar el stream activo.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const obtenerStream = async (req, res) => {
  const id = parseInt(req.params.idStream);

  try {
    pool.query(consultasStreams.obtenerStream, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el stream.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const editarStream = async (req, res) => {
  const id = parseInt(req.params.idStream);
  const { codigo_embebido, id_fecha, orden, estado } = req.body;

  try {
    pool.query(consultasStreams.obtenerStream, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el stream.');

      const streamNoEncontrado = !results.rows.length;

      if (streamNoEncontrado) {
        res.send('El stream no existe en la base de datos.');
      }

      pool.query(
        consultasStreams.editarStream,
        [codigo_embebido, id_fecha, orden, estado, id],
        (err, results) => {
          if (err) throw new Error('No pudimos editar el stream.');
          res.status(200).send('Stream editado correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

export const borrarStream = async (req, res) => {
  const id = parseInt(req.params.idStream);

  try {
    pool.query(consultasStreams.obtenerStream, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el stream.');

      const streamNoEncontrado = !results.rows.length;

      if (streamNoEncontrado) {
        res.send('El stream no existe en la base de datos.');
      }

      pool.query(consultasStreams.borrarStream, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el stream.');
        res.status(200).send('Stream eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};
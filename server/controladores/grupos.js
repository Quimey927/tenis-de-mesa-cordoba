import pool from '../db/db.js';
import consultasGrupos from '../db/consultas/grupos.js';

export const obtenerGrupos = async (req, res) => {
  const idFase = parseInt(req.params.idFase);

  try {
    pool.query(consultasGrupos.obtenerGrupos, [idFase], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los grupos.');
  }
};

export const crearGrupo = async (req, res) => {
  const { nombre, id_fase } = req.body;

  try {
    pool.query(
      consultasGrupos.crearGrupo,
      [nombre, id_fase],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send({ message: 'Grupo creado exitosamente.' });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'No pudimos crear el grupo.' });
  }
};

export const obtenerGrupo = async (req, res) => {
  const id = parseInt(req.params.idGrupo);

  try {
    pool.query(consultasGrupos.obtenerGrupo, [id], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el grupo.');
  }
};

export const editarGrupo = async (req, res) => {
  const id = parseInt(req.params.idGrupo);
  const { nombre } = req.body;

  try {
    pool.query(consultasGrupos.obtenerGrupo, [id], (err, results) => {
      if (err) throw new Error(err);

      const grupoNoEncontrado = !results.rows.length;

      if (grupoNoEncontrado) {
        res.status(200).send('El grupo no existe en la base de datos.');
      }

      pool.query(consultasGrupos.editarGrupo, [nombre, id], (err, results) => {
        if (err) throw new Error();
        res.status(200).send('Grupo editado correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar el grupo.');
  }
};

export const borrarGrupo = async (req, res) => {
  const id = parseInt(req.params.idGrupo);

  try {
    pool.query(consultasGrupos.obtenerGrupo, [id], (err, results) => {
      if (err) throw new Error(err);

      const grupoNoEncontrado = !results.rows.length;

      if (grupoNoEncontrado) {
        res.status(200).send('El grupo no existe en la base de datos.');
      }

      pool.query(consultasGrupos.borrarGrupo, [id], (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Grupo eliminado correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el grupo.');
  }
};

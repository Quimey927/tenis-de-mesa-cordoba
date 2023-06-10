import pool from '../db/db.js';
import consultasClubes from '../db/consultas/clubes.js';

export const obtenerClubes = async (req, res) => {
  try {
    pool.query(consultasClubes.obtenerClubes, (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los clubes.');
  }
};

export const crearClub = async (req, res) => {
  const { nombre, direccion, id_ciudad, escudo_club } = req.body;

  try {
    pool.query(
      consultasClubes.crearClub,
      [nombre, direccion, id_ciudad, escudo_club !== '' ? escudo_club : null],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send('Club creado exitosamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el club.');
  }
};

export const obtenerClub = async (req, res) => {
  const id = parseInt(req.params.idClub);

  try {
    pool.query(consultasClubes.obtenerClub, [id], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el club.');
  }
};

export const editarClub = async (req, res) => {
  const id = parseInt(req.params.idClub);
  const { nombre, direccion, id_ciudad, escudo_club } = req.body;

  try {
    pool.query(consultasClubes.obtenerClub, [id], (err, results) => {
      if (err) throw new Error(err);

      const clubNoEncontrado = !results.rows.length;

      if (clubNoEncontrado) {
        res.status(200).send('El club no existe en la base de datos.');
      }

      pool.query(
        consultasClubes.editarClub,
        [
          nombre,
          direccion,
          id_ciudad,
          escudo_club !== '' ? escudo_club : null,
          id,
        ],
        (err, results) => {
          if (err) throw new Error(err);
          res.status(200).send('Club editado correctamente.');
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar el club.');
  }
};

export const borrarClub = async (req, res) => {
  const id = parseInt(req.params.idClub);

  try {
    pool.query(consultasClubes.obtenerClub, [id], (err, results) => {
      if (err) throw new Error(err);

      const clubNoEncontrado = !results.rows.length;

      if (clubNoEncontrado) {
        res.status(200).send('El club no existe en la base de datos.');
      }

      pool.query(consultasClubes.borrarClub, [id], (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Club eliminado correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el club.');
  }
};

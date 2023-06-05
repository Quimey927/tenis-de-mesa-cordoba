import pool from '../db/db.js';
import consultasCiudades from '../db/consultas/ciudades.js';

export const obtenerCiudades = async (req, res) => {
  try {
    pool.query(consultasCiudades.obtenerCiudades, (err, results) => {
      if (err) throw new Error('No pudimos cargar las ciudades.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const crearCiudad = async (req, res) => {
  const { nombre } = req.body;

  try {
    pool.query(consultasCiudades.crearCiudad, [nombre], (err, results) => {
      if (err) throw new Error('No pudimos crear la ciudad.');
      res.status(201).send('Ciudad creada exitosamente.');
    });
  } catch (err) {
    res.send(err);
  }
};

export const obtenerCiudad = async (req, res) => {
  const id = parseInt(req.params.idCiudad);

  try {
    pool.query(consultasCiudades.obtenerCiudad, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar la ciudad.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const editarCiudad = async (req, res) => {
  const id = parseInt(req.params.idCiudad);
  const { nombre } = req.body;

  try {
    pool.query(consultasCiudades.obtenerCiudad, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar la ciudad');

      const ciudadNoEncontrada = !results.rows.length;

      if (ciudadNoEncontrada) {
        res.send('La ciudad no existe en la base de datos');
      }

      pool.query(
        consultasCiudades.editarCiudad,
        [nombre, id],
        (err, results) => {
          if (err) throw new Error('No pudimos editar la ciudad.');
          res.status(200).send('Ciudad editada correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

export const borrarCiudad = async (req, res) => {
  const id = parseInt(req.params.idCiudad);

  try {
    pool.query(consultasCiudades.obtenerCiudad, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar la ciudad');

      const ciudadNoEncontrada = !results.rows.length;

      if (ciudadNoEncontrada) {
        res.send('La ciudad no existe en la base de datos');
      }

      pool.query(consultasCiudades.borrarCiudad, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar la ciudad.');
        res.status(200).send('Ciudad eliminada correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

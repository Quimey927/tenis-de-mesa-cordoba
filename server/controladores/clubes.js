const pool = require('../db/db');
const consultasClubes = require('../db/consultas/clubes');

module.exports.obtenerClubes = async (req, res) => {
  try {
    pool.query(consultasClubes.obtenerClubes, (err, results) => {
      if (err) throw new Error('No pudimos cargar los clubes.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.crearClub = async (req, res) => {
  const { nombre, direccion, nombre_ciudad, escudo_club } = req.body;

  try {
    pool.query(
      consultasClubes.crearClub,
      [
        nombre,
        direccion,
        nombre_ciudad,
        escudo_club !== '' ? escudo_club : null,
      ],
      (err, results) => {
        if (err) throw new Error('No pudimos crear el club.');
        res.status(201).send('Club creado exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.obtenerClub = async (req, res) => {
  const { nombreClub } = req.params;

  try {
    pool.query(consultasClubes.obtenerClub, [nombreClub], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el club.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.editarClub = async (req, res) => {
  const { nombreClub } = req.params;
  const { nombre, direccion, nombre_ciudad, escudo_club } = req.body;

  try {
    pool.query(consultasClubes.obtenerClub, [nombreClub], (err, results) => {
      if (err) throw new Error('No pudimos buscar el club');

      const clubNoEncontrado = !results.rows.length;

      if (clubNoEncontrado) {
        res.send('El club no existe en la base de datos');
      }

      pool.query(
        consultasClubes.editarClub,
        [
          nombre,
          direccion,
          nombre_ciudad,
          escudo_club !== '' ? escudo_club : null,
          nombreClub,
        ],
        (err, results) => {
          if (err) throw new Error('No pudimos editar el club.');
          res.status(200).send('Club editado correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.borrarClub = async (req, res) => {
  const { nombreClub } = req.params;

  try {
    pool.query(consultasClubes.obtenerClub, [nombreClub], (err, results) => {
      if (err) throw new Error('No pudimos buscar el club');

      const clubNoEncontrado = !results.rows.length;

      if (clubNoEncontrado) {
        res.send('El club no existe en la base de datos');
      }

      pool.query(consultasClubes.borrarClub, [nombre], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el club.');
        res.status(200).send('Club eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

const pool = require('../db/db');
const consultasTorneos = require('../db/consultas/torneos');

module.exports.obtenerTorneos = async (req, res) => {
  try {
    pool.query(consultasTorneos.obtenerTorneos, (err, results) => {
      if (err) throw new Error('No pudimos cargar los torneos.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.crearTorneo = async (req, res) => {
  const {
    titulo,
    temporada,
    año,
    imagen_torneo,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
    id_edicion_previa,
    id_edicion_siguiente,
    slug,
  } = req.body;

  try {
    pool.query(
      consultasTorneos.crearTorneo,
      [
        titulo,
        temporada,
        año,
        imagen_torneo !== '' ? imagen_torneo : null,
        fecha_inicio !== '' ? fecha_inicio : null,
        fecha_finalizacion !== '' ? fecha_finalizacion : null,
        descripcion !== '' ? descripcion : null,
        id_edicion_previa !== '' ? id_edicion_previa : null,
        id_edicion_siguiente !== '' ? id_edicion_siguiente : null,
        slug,
      ],
      (err, results) => {
        if (err) throw new Error('No pudimos crear el torneo.');
        res.status(201).send('Torneo creado exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.obtenerTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);

  try {
    pool.query(consultasTorneos.obtenerTorneo, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el torneo.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.obtenerTorneoPorSlug = async (req, res) => {
  const { slugTorneo } = req.params;

  try {
    pool.query(
      consultasTorneos.obtenerTorneoPorSlug,
      [slugTorneo],
      (err, results) => {
        if (err) throw new Error('No pudimos encontrar el torneo.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.editarTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);
  const {
    titulo,
    temporada,
    año,
    imagen_torneo,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
    id_edicion_previa,
    id_edicion_siguiente,
    slug,
  } = req.body;

  try {
    pool.query(consultasTorneos.obtenerTorneo, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el torneo');

      const torneoNoEncontrado = !results.rows.length;

      if (torneoNoEncontrado) {
        res.send('El torneo no existe en la base de datos');
      }

      pool.query(
        consultasTorneos.editarTorneo,
        [
          titulo,
          temporada,
          año,
          imagen_torneo !== '' ? imagen_torneo : null,
          fecha_inicio !== '' ? fecha_inicio : null,
          fecha_finalizacion !== '' ? fecha_finalizacion : null,
          descripcion !== '' ? descripcion : null,
          id_edicion_previa !== '' ? id_edicion_previa : null,
          id_edicion_siguiente !== '' ? id_edicion_siguiente : null,
          slug,
          id,
        ],
        (err, results) => {
          if (err) throw new Error('No pudimos editar el torneo.');
          res.status(200).send('Torneo editado correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.borrarTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);

  try {
    pool.query(consultasTorneos.obtenerTorneo, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el equipo');

      const torneoNoEncontrado = !results.rows.length;

      if (torneoNoEncontrado) {
        res.send('El torneo no existe en la base de datos');
      }

      pool.query(consultasTorneos.borrarTorneo, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el torneo.');
        res.status(200).send('Torneo eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

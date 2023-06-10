import pool from '../db/db.js';
import consultasTorneos from '../db/consultas/torneos.js';

export const obtenerTorneos = async (req, res) => {
  try {
    pool.query(consultasTorneos.obtenerTorneos, (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los torneos.');
  }
};

export const crearTorneo = async (req, res) => {
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
        if (err) throw new Error(err);
        res.status(201).send('Torneo creado exitosamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el torneo.');
  }
};

export const obtenerTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);

  try {
    pool.query(consultasTorneos.obtenerTorneo, [id], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el torneo.');
  }
};

export const obtenerTorneoPorSlug = async (req, res) => {
  const { slugTorneo } = req.params;

  try {
    pool.query(
      consultasTorneos.obtenerTorneoPorSlug,
      [slugTorneo],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el torneo.');
  }
};

export const editarTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);
  const {
    año,
    imagen_torneo,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
    id_edicion_previa,
    id_edicion_siguiente,
  } = req.body;

  try {
    pool.query(consultasTorneos.obtenerTorneo, [id], (err, results) => {
      if (err) throw new Error(err);

      const torneoNoEncontrado = !results.rows.length;

      if (torneoNoEncontrado) {
        res.status(200).send('El torneo no existe en la base de datos.');
      }

      pool.query(
        consultasTorneos.editarTorneo,
        [
          año,
          imagen_torneo !== '' ? imagen_torneo : null,
          fecha_inicio !== '' ? fecha_inicio : null,
          fecha_finalizacion !== '' ? fecha_finalizacion : null,
          descripcion !== '' ? descripcion : null,
          id_edicion_previa !== '' ? id_edicion_previa : null,
          id_edicion_siguiente !== '' ? id_edicion_siguiente : null,
          id,
        ],
        (err, results) => {
          if (err) throw new Error(err);
          res.status(200).send('Torneo editado correctamente.');
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar el torneo.');
  }
};

export const borrarTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);

  try {
    pool.query(consultasTorneos.obtenerTorneo, [id], (err, results) => {
      if (err) throw new Error(err);

      const torneoNoEncontrado = !results.rows.length;

      if (torneoNoEncontrado) {
        res.status(200).send('El torneo no existe en la base de datos.');
      }

      pool.query(consultasTorneos.borrarTorneo, [id], (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Torneo eliminado correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el torneo.');
  }
};

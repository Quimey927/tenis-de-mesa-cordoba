import pool from '../db/db.js';
import consultasFechas from '../db/consultas/fechas.js';

export const obtenerFechas = async (req, res) => {
  try {
    pool.query(consultasFechas.obtenerFechas, (err, results) => {
      if (err) throw new Error('No pudimos cargar las fechas.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const obtenerFechasTorneo = async (req, res) => {
  const id = parseInt(req.params.idTorneo);

  try {
    pool.query(consultasFechas.obtenerFechasTorneo, [id], (err, results) => {
      if (err) throw new Error('No pudimos cargar las fechas del torneo.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const obtenerFechasDelMes = async (req, res) => {
  const { mes, año } = req.query;

  const fecha_limite_inicial = `${año}-${mes}-01`;

  const fecha_limite_final =
    mes !== '12'
      ? `${año}-${(+mes + 1).toString().padStart(2, '0')}-01`
      : `${año}-${mes.toString().padStart(2, '0')}-31`;

  try {
    pool.query(
      consultasFechas.obtenerFechasDelMes,
      [fecha_limite_inicial, fecha_limite_final],
      (err, results) => {
        if (err) throw new Error('No pudimos encontrar las fechas del mes.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const crearFecha = async (req, res) => {
  const {
    nombre,
    num_fecha,
    id_torneo,
    id_club,
    fecha_inicio,
    fecha_finalizacion,
    slug,
  } = req.body;

  try {
    pool.query(
      consultasFechas.crearFecha,
      [
        nombre,
        num_fecha,
        id_torneo,
        id_club,
        fecha_inicio !== '' ? fecha_inicio : null,
        fecha_finalizacion !== '' ? fecha_finalizacion : null,
        slug,
      ],
      (err, results) => {
        if (err) throw new Error('No pudimos crear la fecha.');
        res.status(201).send('Fecha creada exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const obtenerFecha = async (req, res) => {
  const id = parseInt(req.params.idFecha);

  try {
    pool.query(consultasFechas.obtenerFecha, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar la fecha.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

export const obtenerFechaPorSlug = async (req, res) => {
  const { slugFecha } = req.params;

  try {
    pool.query(
      consultasFechas.obtenerFechaPorSlug,
      [slugFecha],
      (err, results) => {
        if (err) throw new Error('No pudimos encontrar la fecha.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const editarFecha = async (req, res) => {
  const id = parseInt(req.params.idFecha);
  const { nombre, id_club, fecha_inicio, fecha_finalizacion, slug } = req.body;

  try {
    pool.query(consultasFechas.obtenerFecha, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar la fecha');

      const fechaNoEncontrada = !results.rows.length;

      if (fechaNoEncontrada) {
        res.send('La fecha no existe en la base de datos');
      }

      pool.query(
        consultasFechas.editarFecha,
        [
          nombre,
          id_club,
          fecha_inicio !== '' ? fecha_inicio : null,
          fecha_finalizacion !== '' ? fecha_finalizacion : null,
          slug,
          id,
        ],
        (err, results) => {
          if (err) throw new Error('No pudimos editar la fecha.');
          res.status(200).send('Fecha editada correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

export const borrarFecha = async (req, res) => {
  const id = parseInt(req.params.idFecha);

  try {
    pool.query(consultasFechas.obtenerFecha, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar la fecha');

      const fechaNoEncontrada = !results.rows.length;

      if (fechaNoEncontrada) {
        res.send('La fecha no existe en la base de datos');
      }

      pool.query(consultasFechas.borrarFecha, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar la fecha.');
        res.status(200).send('Fecha eliminada correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

import pool from '../db/db.js';
import consultasCategoriasFechas from '../db/consultas/categorias_fechas.js';

export const obtenerCategoriasFecha = async (req, res) => {
  const idFecha = parseInt(req.params.idFecha);

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriasFecha,
      [idFecha],
      (err, results) => {
        if (err)
          throw new Error('No pudimos cargar las categorías de la fecha.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const crearCategoriaFecha = async (req, res) => {
  const { categoria, id_fecha, orden } = req.body;

  try {
    pool.query(
      consultasCategoriasFechas.crearCategoriaFecha,
      [categoria, id_fecha, orden],
      (err, results) => {
        if (err) throw new Error('No pudimos crear la categoría de la fecha.');
        res.status(201).send('Categoría de la fecha creada exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const obtenerCategoriaFecha = async (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriaFecha,
      [id],
      (err, results) => {
        if (err)
          throw new Error('No pudimos encontrar la categoría de la fecha.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const editarCategoriaFecha = async (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);
  const { categoria, id_fecha, orden } = req.body;

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriaFecha,
      [id],
      (err, results) => {
        if (err) throw new Error('No pudimos buscar la categoría de la fecha');

        const categoriaFechaNoEncontrada = !results.rows.length;

        if (categoriaFechaNoEncontrada) {
          res.send('La categoría de la fecha no existe en la base de datos');
        }

        pool.query(
          consultasCategoriasFechas.editarCategoriaFecha,
          [categoria, id_fecha, orden, id],
          (err, results) => {
            if (err)
              throw new Error('No pudimos editar la categoría del fecha.');
            res.status(200).send('Categoría del fecha editada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const borrarCategoriaFecha = async (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriaFecha,
      [id],
      (err, results) => {
        if (err) throw new Error('No pudimos buscar la categoría de la fecha');

        const categoriaFechaNoEncontrada = !results.rows.length;

        if (categoriaFechaNoEncontrada) {
          res.send('La categoría de la fecha no existe en la base de datos');
        }

        pool.query(
          consultasCategoriasFechas.borrarCategoriaFecha,
          [id],
          (err, results) => {
            if (err)
              throw new Error('No pudimos eliminar la categoría de la fecha.');
            res
              .status(200)
              .send('Categoría de la fecha eliminada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    res.send(err);
  }
};

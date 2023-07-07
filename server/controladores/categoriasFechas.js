import pool from '../db/db.js';
import consultasCategoriasFechas from '../db/consultas/categoriasFechas.js';

export const obtenerCategoriasFecha = async (req, res) => {
  const idFecha = parseInt(req.params.idFecha);

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriasFecha,
      [idFecha],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar las categorías de la fecha.');
  }
};

export const crearCategoriaFecha = async (req, res) => {
  const { categoria, id_fecha, orden, dia, id_categoria_torneo_default } =
    req.body;

  try {
    pool.query(
      consultasCategoriasFechas.crearCategoriaFecha,
      [categoria, id_fecha, orden, dia, id_categoria_torneo_default],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send('Categoría de la fecha creada exitosamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear la categoría de la fecha.');
  }
};

export const obtenerCategoriaFecha = async (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriaFecha,
      [id],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar la categoría de la fecha.');
  }
};

export const editarCategoriaFecha = async (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);
  const { categoria, id_fecha, orden, dia, id_categoria_torneo_default } =
    req.body;

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriaFecha,
      [id],
      (err, results) => {
        if (err) throw new Error(err);

        const categoriaFechaNoEncontrada = !results.rows.length;

        if (categoriaFechaNoEncontrada) {
          res
            .status(200)
            .send('La categoría de la fecha no existe en la base de datos.');
        }

        pool.query(
          consultasCategoriasFechas.editarCategoriaFecha,
          [categoria, id_fecha, orden, dia, id_categoria_torneo_default, id],
          (err, results) => {
            if (err) throw new Error(err);
            res
              .status(200)
              .send('Categoría de la fecha editada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar la categoría de la fecha.');
  }
};

export const borrarCategoriaFecha = async (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);

  try {
    pool.query(
      consultasCategoriasFechas.obtenerCategoriaFecha,
      [id],
      (err, results) => {
        if (err) throw new Error(err);

        const categoriaFechaNoEncontrada = !results.rows.length;

        if (categoriaFechaNoEncontrada) {
          res
            .status(200)
            .send('La categoría de la fecha no existe en la base de datos.');
        }

        pool.query(
          consultasCategoriasFechas.borrarCategoriaFecha,
          [id],
          (err, results) => {
            if (err) throw new Error(err);
            res
              .status(200)
              .send('Categoría de la fecha eliminada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar la categoría de la fecha.');
  }
};

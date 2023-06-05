import pool from '../db/db.js';
import consultasCategoriasTorneos from '../db/consultas/categorias_torneos.js';

export const obtenerCategoriasTorneo = async (req, res) => {
  const idTorneo = parseInt(req.params.idTorneo);

  try {
    pool.query(
      consultasCategoriasTorneos.obtenerCategoriasTorneo,
      [idTorneo],
      (err, results) => {
        if (err)
          throw new Error('No pudimos cargar las categorías del torneo.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const crearCategoriaTorneo = async (req, res) => {
  const { categoria, id_torneo, orden } = req.body;

  try {
    pool.query(
      consultasCategoriasTorneos.crearCategoriaTorneo,
      [categoria, id_torneo, orden],
      (err, results) => {
        if (err) throw new Error('No pudimos crear la categoría del torneo.');
        res.status(201).send('Ciudad creada exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const obtenerCategoriaTorneo = async (req, res) => {
  const id = parseInt(req.params.idCategoriaTorneo);

  try {
    pool.query(
      consultasCategoriasTorneos.obtenerCategoriaTorneo,
      [id],
      (err, results) => {
        if (err)
          throw new Error('No pudimos encontrar la categoría del torneo.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const editarCategoriaTorneo = async (req, res) => {
  const id = parseInt(req.params.idCategoriaTorneo);
  const { categoria, id_torneo, orden } = req.body;

  try {
    pool.query(
      consultasCategoriasTorneos.obtenerCategoriaTorneo,
      [id],
      (err, results) => {
        if (err) throw new Error('No pudimos buscar la categoría del torneo');

        const categoriaTorneoNoEncontrada = !results.rows.length;

        if (categoriaTorneoNoEncontrada) {
          res.send('La categoría del torneo no existe en la base de datos');
        }

        pool.query(
          consultasCategoriasTorneos.editarCategoriaTorneo,
          [categoria, id_torneo, orden, id],
          (err, results) => {
            if (err)
              throw new Error('No pudimos editar la categoría del torneo.');
            res.status(200).send('Categoría del torneo editada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    res.send(err);
  }
};

export const borrarCategoriaTorneo = async (req, res) => {
  const id = parseInt(req.params.idCategoriaTorneo);

  try {
    pool.query(
      consultasCategoriasTorneos.obtenerCategoriaTorneo,
      [id],
      (err, results) => {
        if (err) throw new Error('No pudimos buscar la categoría del torneo');

        const categoriaTorneoNoEncontrada = !results.rows.length;

        if (categoriaTorneoNoEncontrada) {
          res.send('La categoría del torneo no existe en la base de datos');
        }

        pool.query(
          consultasCategoriasTorneos.borrarCategoriaTorneo,
          [id],
          (err, results) => {
            if (err)
              throw new Error('No pudimos eliminar la categoría del torneo.');
            res
              .status(200)
              .send('Categoría del torneo eliminada correctamente.');
          }
        );
      }
    );
  } catch (err) {
    res.send(err);
  }
};

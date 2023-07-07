import pool from '../db/db.js';
import consultasCategoriasTorneosJugadores from '../db/consultas/categoriasTorneosJugadores.js';

export const obtenerJugadoresDeLasCategoriasTorneos = async (req, res) => {
  try {
    pool.query(
      consultasCategoriasTorneosJugadores.obtenerJugadoresDeLasCategoriasTorneos,
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        'No pudimos cargar los jugadores de las categorías de los torneos.'
      );
  }
};

export const obtenerJugadoresDeLaCategoriaTorneo = async (req, res) => {
  const idCategoriaTorneo = parseInt(req.params.idCategoriaTorneo);

  try {
    pool.query(
      consultasCategoriasTorneosJugadores.obtenerJugadoresDeLaCategoriaTorneo,
      [idCategoriaTorneo],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos cargar los jugadores de la categoría del torneo.');
  }
};

export const agregarJugadorACategoriaTorneo = async (req, res) => {
  const { idCategoriaTorneo, idJugador } = req.body;

  if (!idJugador) {
    res.status(200).send('No hay jugadores nuevos para agregar.');
  } else {
    try {
      pool.query(
        consultasCategoriasTorneosJugadores.agregarJugadorACategoriaTorneo,
        [idCategoriaTorneo, idJugador],
        (err, results) => {
          if (err) throw new Error(err);
          res.status(200).send('Jugador agregado correctamente.');
        }
      );
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send('No pudimos agregar el jugador a la categoría del torneo.');
    }
  }
};

export const editarPosicionYPuntajeCategoriaTorneo = async (req, res) => {
  const idFila = parseInt(req.params.idFila);

  const { posicion, puntaje_total } = req.body;

  try {
    pool.query(
      consultasCategoriasTorneosJugadores.editarPosicionYPuntajeCategoriaTorneo,
      [posicion, puntaje_total, idFila],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Jugador editado correctamente');
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos editar el jugador de la categoría del torneo.');
  }
};

export const crearNuevoJugadorCategoriaTorneo = async (req, res) => {
  const { nuevoJugador, idCategoriaTorneo } = req.body;

  try {
    pool.query(
      consultasCategoriasTorneosJugadores.crearNuevoJugadorCategoriaTorneo,
      [nuevoJugador, idCategoriaTorneo],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Jugador creado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos crear el jugadores de la categoría del torneo.');
  }
};

export const borrarJugadorDeCategoriaTorneo = async (req, res) => {
  const idFila = parseInt(req.params.idFila);

  try {
    pool.query(
      consultasCategoriasTorneosJugadores.borrarJugadorDeCategoriaTorneo,
      [idFila],
      (err, results) => {
        if (err) throw new Error(err);
        res
          .status(200)
          .send('Jugador de la categoría del torneo eliminado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos eliminar el jugador de la categoría del torneo.');
  }
};

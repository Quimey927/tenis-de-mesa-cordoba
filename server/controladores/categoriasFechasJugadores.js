import pool from '../db/db.js';
import consultasCategoriasFechasJugadores from '../db/consultas/categoriasFechasJugadores.js';

export const agregarJugadoresACategoriaFecha = async (req, res) => {
  const idCategoriaFecha = parseInt(req.params.idCategoriaFecha);
  const { jugadores, idCategoriaTorneo } = req.body;

  const cant_jugadores = jugadores.length;

  if (cant_jugadores === 0) {
    res.status(200).send('No hay jugadores nuevos para agregar.');
  } else {
    try {
      pool.query(
        consultasCategoriasFechasJugadores.agregarJugadoresACategoriaFecha(
          cant_jugadores
        ),
        [idCategoriaFecha, idCategoriaTorneo, ...jugadores],
        (err, results) => {
          if (err) throw new Error(err);
          res.status(200).send('Jugadores agregados correctamente.');
        }
      );
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send('No pudimos agregar los jugadores a la categoría de la fecha.');
    }
  }
};

export const obtenerJugadoresDeLaCategoriaFecha = async (req, res) => {
  const idCategoriaFecha = parseInt(req.params.idCategoriaFecha);

  try {
    pool.query(
      consultasCategoriasFechasJugadores.obtenerJugadoresDeLaCategoriaFecha,
      [idCategoriaFecha],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos cargar los jugadores de la categoría de la fecha.');
  }
};

export const editarPosicionYPuntaje = async (req, res) => {
  const idFila = parseInt(req.params.idFila);
  const { posicion, puntaje, id_categoria_torneo } = req.body;

  console.log(req.body);

  try {
    pool.query(
      consultasCategoriasFechasJugadores.editarPosicionYPuntaje,
      [posicion, puntaje, id_categoria_torneo, idFila],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Jugador editado correctamente');
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos editar el jugador de la categoría de la fecha.');
  }
};

export const borrarJugadorDeCategoriaFecha = async (req, res) => {
  const idFila = parseInt(req.params.idFila);

  try {
    pool.query(
      consultasCategoriasFechasJugadores.borrarJugadorDeCategoriaFecha,
      [idFila],
      (err, results) => {
        if (err) throw new Error(err);
        res
          .status(200)
          .send('Jugador de la categoría de la fecha eliminado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos eliminar el jugador de la categoría de la fecha.');
  }
};

export const crearNuevoJugador = async (req, res) => {
  const idCategoriaFecha = parseInt(req.params.idCategoriaFecha);
  const { nuevoJugador } = req.body;

  try {
    pool.query(
      consultasCategoriasFechasJugadores.crearNuevoJugador,
      [idCategoriaFecha, nuevoJugador],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Jugador creado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('No pudimos crear el jugadores de la categoría de la fecha.');
  }
};

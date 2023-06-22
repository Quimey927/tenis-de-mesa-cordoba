import pool from '../db/db.js';
import consultasPartidos from '../db/consultas/partidos.js';

export const obtenerPartidosDelGrupo = async (req, res) => {
  const id = parseInt(req.params.idGrupo);

  try {
    pool.query(
      consultasPartidos.obtenerPartidosDelGrupo,
      [id],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los partidos del grupo.');
  }
};

export const crearPartidosDelGrupo = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);

  const { dia, jugadores } = req.body;

  try {
    pool.query(
      consultasPartidos.crearPartidosDelGrupo(jugadores),
      [idGrupo, dia],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear los partidos del grupo.');
  }
};

export const intercambiarJugadoresPartido = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  try {
    pool.query(
      consultasPartidos.intercambiarJugadoresPartido,
      [idPartido],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos intercambiar los jugadores del partido.');
  }
};

export const editarPartido = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  const { orden, sets_jugador_1, sets_jugador_2 } = req.body;

  try {
    pool.query(
      consultasPartidos.editarPartido,
      [orden, sets_jugador_1, sets_jugador_2, idPartido],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar el orden del partido.');
  }
};

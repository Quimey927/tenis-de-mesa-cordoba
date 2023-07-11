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

  const { dia, idJugadores } = req.body;

  const cant_partidos = idJugadores.length / 2;

  try {
    pool.query(
      consultasPartidos.crearPartidosDelGrupo(cant_partidos),
      [idGrupo, dia, ...idJugadores],
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

export const crearPartidosDelGrupoConFecha = async (req, res) => {
  const idGrupo = parseInt(req.params.idGrupo);
  const { cantFechas, cantJugadores, dia } = req.body;

  const cantPartidosPorFecha = Math.floor(cantJugadores / 2);

  try {
    pool.query(
      consultasPartidos.crearPartidosDelGrupoConFecha(
        cantFechas,
        cantPartidosPorFecha
      ),
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

export const editarPartido = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  const {
    num_fecha,
    orden,
    sets_jugador_1,
    sets_jugador_2,
    id_jugador_1,
    id_jugador_2,
  } = req.body;

  try {
    pool.query(
      consultasPartidos.editarPartido,
      [
        num_fecha ? num_fecha : null,
        orden,
        sets_jugador_1,
        sets_jugador_2,
        id_jugador_1 ? +id_jugador_1 : null,
        id_jugador_2 ? +id_jugador_2 : null,
        idPartido,
      ],
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

export const editarSetsPartido = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  const { sets_jugador_1, sets_jugador_2 } = req.body;

  try {
    pool.query(
      consultasPartidos.editarSetsPartido,
      [sets_jugador_1, sets_jugador_2, idPartido],
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

export const obtenerPartidosDeLaEliminatoria = async (req, res) => {
  const idEliminatoria = parseInt(req.params.idEliminatoria);

  try {
    pool.query(
      consultasPartidos.obtenerPartidosDeLaEliminatoria,
      [idEliminatoria],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los partidos de la eliminatoria.');
  }
};

export const crearPartidosDeLaEliminatoria = async (req, res) => {
  const { dondeEmpieza, tercerPuesto, idEliminatoria, dia } = req.body;

  const cant_partidos = 2 ** dondeEmpieza - 1;
  const hay_tercer_puesto = tercerPuesto === 'N' ? false : true;

  try {
    pool.query(
      consultasPartidos.crearPartidosDeLaEliminatoria(
        cant_partidos,
        hay_tercer_puesto
      ),
      [idEliminatoria, dia],
      (err, results) => {
        if (err) throw new Error(err);
        res
          .status(200)
          .send('Partidos de la eliminatoria creados correctamente');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear los partidos de la eliminatoria.');
  }
};

export const borrarPartido = async (req, res) => {
  const idPartido = parseInt(req.params.idPartido);

  try {
    pool.query(consultasPartidos.borrarPartido, [idPartido], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).send('Partido eliminado correctamente.');
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el partido.');
  }
};

export const crearPartido = async (req, res) => {
  const { idGrupo, idEliminatoria, dia } = req.body;

  try {
    pool.query(
      consultasPartidos.crearPartido,
      [dia, idGrupo, idEliminatoria],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Partido creado correctamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el partido.');
  }
};

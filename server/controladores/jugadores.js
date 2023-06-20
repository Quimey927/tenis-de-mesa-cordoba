import pool from '../db/db.js';
import consultasJugadores from '../db/consultas/jugadores.js';

export const obtenerJugadores = async (req, res) => {
  try {
    pool.query(consultasJugadores.obtenerJugadores, (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos cargar los jugadores.');
  }
};

export const crearJugador = async (req, res) => {
  const {
    nombre,
    segundo_nombre,
    apellido,
    segundo_apellido,
    fecha_nacimiento,
    email,
    foto_perfil,
    id_club,
    categoria_fecoteme,
    slug,
  } = req.body;

  try {
    pool.query(
      consultasJugadores.crearJugador,
      [
        nombre,
        segundo_nombre,
        apellido,
        segundo_apellido,
        fecha_nacimiento !== '' ? fecha_nacimiento : null,
        email !== '' ? email : null,
        foto_perfil !== '' ? foto_perfil : null,
        id_club,
        categoria_fecoteme !== '' ? categoria_fecoteme : null,
        slug,
      ],
      (err, results) => {
        if (err) throw new Error(err);
        res.status(201).send('Jugador creado exitosamente.');
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos crear el jugador.');
  }
};

export const obtenerJugador = async (req, res) => {
  const id = parseInt(req.params.idJugador);

  try {
    pool.query(consultasJugadores.obtenerJugador, [id], (err, results) => {
      if (err) throw new Error(err);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos encontrar el jugador.');
  }
};

export const editarJugador = async (req, res) => {
  const id = parseInt(req.params.idJugador);
  const {
    nombre,
    segundo_nombre,
    apellido,
    segundo_apellido,
    fecha_nacimiento,
    email,
    foto_perfil,
    id_club,
    categoria_fecoteme,
    slug,
  } = req.body;

  try {
    pool.query(consultasJugadores.obtenerJugador, [id], (err, results) => {
      if (err) throw new Error(err);

      const jugadorNoEncontrado = !results.rows.length;

      if (jugadorNoEncontrado) {
        res.status(200).send('El jugador no existe en la base de datos.');
      }

      pool.query(
        consultasJugadores.editarJugador,
        [
          nombre,
          segundo_nombre,
          apellido,
          segundo_apellido,
          fecha_nacimiento !== '' ? fecha_nacimiento : null,
          email !== '' ? email : null,
          foto_perfil !== '' ? foto_perfil : null,
          id_club !== '' ? id_club : null,
          categoria_fecoteme !== '' ? categoria_fecoteme : null,
          slug,
          id,
        ],
        (err, results) => {
          if (err) throw new Error(err);
          res.status(200).send('Jugador editado correctamente.');
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos editar el jugador.');
  }
};

export const borrarJugador = async (req, res) => {
  const id = parseInt(req.params.idJugador);

  try {
    pool.query(consultasJugadores.obtenerJugador, [id], (err, results) => {
      if (err) throw new Error(err);

      const jugadorNoEncontrado = !results.rows.length;

      if (jugadorNoEncontrado) {
        res.status(200).send('El jugador no existe en la base de datos.');
      }

      pool.query(consultasJugadores.borrarJugador, [id], (err, results) => {
        if (err) throw new Error(err);
        res.status(200).send('Jugador eliminado correctamente.');
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('No pudimos eliminar el jugador.');
  }
};

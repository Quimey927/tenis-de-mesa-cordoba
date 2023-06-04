const pool = require('../db/db');
const consultasJugadores = require('../db/consultas/jugadores');

module.exports.obtenerJugadores = async (req, res) => {
  try {
    pool.query(consultasJugadores.obtenerJugadores, (err, results) => {
      if (err) throw new Error('No pudimos cargar los jugadores.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.crearJugador = async (req, res) => {
  const {
    nombre,
    segundo_nombre,
    apellido,
    segundo_apellido,
    cumpleaños,
    email,
    nombre_club,
    es_federado,
    categoria_fecoteme,
  } = req.body;

  try {
    pool.query(
      consultasJugadores.crearJugador,
      [
        nombre,
        segundo_nombre !== '' ? segundo_nombre : null,
        apellido,
        segundo_apellido !== '' ? segundo_apellido : null,
        cumpleaños !== '' ? cumpleaños : null,
        email !== '' ? email : null,
        foto_perfil !== '' ? foto_perfil : null,
        nombre_club !== '' ? nombre_club : null,
        es_federado !== '' ? es_federado : null,
        categoria_fecoteme !== '' ? categoria_fecoteme : null,
      ],
      (err, results) => {
        if (err) throw new Error('No pudimos crear el jugador.');
        res.status(201).send('Jugador creado exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.obtenerJugador = async (req, res) => {
  const id = parseInt(req.params.idJugador);

  try {
    pool.query(consultasJugadores.obtenerJugador, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el jugador.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.editarJugador = async (req, res) => {
  const id = parseInt(req.params.idJugador);
  const {
    nombre,
    segundo_nombre,
    apellido,
    segundo_apellido,
    cumpleaños,
    email,
    nombre_club,
    es_federado,
    categoria_fecoteme,
  } = req.body;

  try {
    pool.query(consultasJugadores.obtenerJugador, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el jugador');

      const jugadorNoEncontrado = !results.rows.length;

      if (jugadorNoEncontrado) {
        res.send('El jugador no existe en la base de datos');
      }

      pool.query(
        consultasJugadores.editarJugador,
        [
          nombre,
          segundo_nombre !== '' ? segundo_nombre : null,
          apellido,
          segundo_apellido !== '' ? segundo_apellido : null,
          cumpleaños !== '' ? cumpleaños : null,
          email !== '' ? email : null,
          foto_perfil !== '' ? foto_perfil : null,
          nombre_club !== '' ? nombre_club : null,
          es_federado !== '' ? es_federado : null,
          categoria_fecoteme !== '' ? categoria_fecoteme : null,
          id,
        ],
        (err, results) => {
          if (err) throw new Error('No pudimos editar el jugador.');
          res.status(200).send('Jugador editado correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.borrarJugador = async (req, res) => {
  const id = parseInt(req.params.idJugador);

  try {
    pool.query(consultasJugadores.obtenerJugador, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el jugador');

      const jugadorNoEncontrado = !results.rows.length;

      if (jugadorNoEncontrado) {
        res.send('El jugador no existe en la base de datos');
      }

      pool.query(consultasJugadores.borrarJugador, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el jugador.');
        res.status(200).send('Jugador eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

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
        segundo_nombre !== '' ? segundo_nombre : null,
        apellido,
        segundo_apellido !== '' ? segundo_apellido : null,
        fecha_nacimiento !== '' ? fecha_nacimiento : null,
        email !== '' ? email : null,
        foto_perfil !== '' ? foto_perfil : null,
        id_club !== '' ? id_club : null,
        categoria_fecoteme !== '' ? categoria_fecoteme : null,
        slug,
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
    fecha_nacimiento,
    email,
    foto_perfil,
    id_club,
    categoria_fecoteme,
    slug,
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
          fecha_nacimiento !== '' ? fecha_nacimiento : null,
          email !== '' ? email : null,
          foto_perfil !== '' ? foto_perfil : null,
          id_club !== '' ? id_club : null,
          categoria_fecoteme !== '' ? categoria_fecoteme : null,
          slug,
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

const pool = require('../db/db');
const playerQueries = require('../db/queries/players');

module.exports.getPlayers = async (req, res) => {
  try {
    pool.query(playerQueries.getPlayers, (err, results) => {
      if (err) throw new Error('No pudimos cargar los países.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.createPlayer = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    second_last_name,
    birthdate,
    email,
    club_name,
    is_federated,
    fecoteme_category,
  } = req.body;

  try {
    pool.query(
      playerQueries.createPlayer,
      [
        first_name,
        middle_name,
        last_name,
        second_last_name,
        birthdate,
        email,
        club_name,
        is_federated,
        fecoteme_category,
      ],
      (err, results) => {
        if (err) throw new Error('No pudimos crear el equipo.');
        res.status(201).send('Equipo creado exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.getPlayer = async (req, res) => {
  const id = parseInt(req.params.playerId);

  try {
    pool.query(playerQueries.getPlayer, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el equipo.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.updatePlayer = async (req, res) => {
  const id = parseInt(req.params.playerId);
  const {
    first_name,
    middle_name,
    last_name,
    second_last_name,
    birthdate,
    email,
    club_name,
    is_federated,
    fecoteme_category,
  } = req.body;

  try {
    pool.query(playerQueries.getPlayer, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el equipo');

      const equipoNoEncontrado = !results.rows.length;

      if (equipoNoEncontrado) {
        res.send('El equipo no existe en la base de datos');
      }

      pool.query(
        playerQueries.updatePlayer,
        [
          first_name,
          middle_name,
          last_name,
          second_last_name,
          birthdate,
          email,
          club_name,
          is_federated,
          fecoteme_category,
          id,
        ],
        (err, results) => {
          if (err) throw new Error('No pudimos editar el equipo.');
          res.status(200).send('Equipo editado correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.deletePlayer = async (req, res) => {
  const id = parseInt(req.params.playerId);

  try {
    pool.query(playerQueries.getPlayer, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el equipo');

      const equipoNoEncontrado = !results.rows.length;

      if (equipoNoEncontrado) {
        res.send('El equipo no existe en la base de datos');
      }

      pool.query(playerQueries.deletePlayer, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el equipo.');
        res.status(200).send('Equipo eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

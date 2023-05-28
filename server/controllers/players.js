const pool = require('../db/db');
const playerQueries = require('../db/queries/players');

module.exports.getPlayers = async (req, res) => {
  try {
    pool.query(playerQueries.getPlayers, (err, results) => {
      if (err) throw new Error('No pudimos cargar los jugadores.');
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
        middle_name !== '' ? middle_name : null,
        last_name,
        second_last_name !== '' ? second_last_name : null,
        birthdate !== '' ? birthdate : null,
        email !== '' ? email : null,
        club_name !== '' ? club_name : null,
        is_federated !== '' ? is_federated : null,
        fecoteme_category !== '' ? fecoteme_category : null,
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

module.exports.getPlayer = async (req, res) => {
  const id = parseInt(req.params.playerId);

  try {
    pool.query(playerQueries.getPlayer, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el jugador.');
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
      if (err) throw new Error('No pudimos buscar el jugador');

      const playerNotFound = !results.rows.length;

      if (playerNotFound) {
        res.send('El jugador no existe en la base de datos');
      }

      pool.query(
        playerQueries.updatePlayer,
        [
          first_name,
          middle_name !== '' ? middle_name : null,
          last_name,
          second_last_name !== '' ? second_last_name : null,
          birthdate !== '' ? birthdate : null,
          email !== '' ? email : null,
          club_name !== '' ? club_name : null,
          is_federated !== '' ? is_federated : null,
          fecoteme_category !== '' ? fecoteme_category : null,
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

module.exports.deletePlayer = async (req, res) => {
  const id = parseInt(req.params.playerId);

  try {
    pool.query(playerQueries.getPlayer, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el jugador');

      const playerNotFound = !results.rows.length;

      if (playerNotFound) {
        res.send('El jugador no existe en la base de datos');
      }

      pool.query(playerQueries.deletePlayer, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el jugador.');
        res.status(200).send('Jugador eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

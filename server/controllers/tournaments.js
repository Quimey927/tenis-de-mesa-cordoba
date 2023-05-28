// const allTournaments = [
//   {
//     id: 1,
//     tournamentTitle: 'Liga Provincial',
//     season: 'Temporada 2022',
//     year: 2022,
//     imagePath:
//       'url(/images/tournaments_images/torneo_+30_hermau_primer_semestre_2023.jpg',
//   },
//   {
//     id: 2,
//     tournamentTitle: 'Liga de Equipos',
//     season: 'Temporada 2022',
//     year: 2022,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
//   },
//   {
//     id: 3,
//     tournamentTitle: 'Supercopa de Clubes',
//     season: 'Temporada 2023',
//     year: 2023,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
//   },
//   {
//     id: 4,
//     tournamentTitle: 'Liga Provincial',
//     season: 'Temporada 2023',
//     year: 2023,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',

//     description:
//       'Torneo oficial de la Fe.Co.Te.Me. (Federación Cordobesa de Tenis de Mesa). En cada torneo se disputan las categorías Séptima, Sexta, Quinta, Cuarta, Tercera, Segunda, Primera, SuperFECOTEME, Sub 23, Menores, Maxi 40 A-B y Sub 40. \n Entre las categorías SuperFECOTEME, Primera, Segunda, Tercera, Cuarta, Quinta, Sexta habrá ascensos y descensos (6 ascensos, y una cantidad variable de descensos de acuerdo a la cantidad de inscriptos). Además, habrá 6 ascensos de Séptima a Sexta (aunque no habrá descensos de sexta a séptima). \n El torneo otorga puntaje para el ranking anual, según la siguiente tabla: .',
//   },
//   {
//     id: 5,
//     tournamentTitle: 'Liga de Equipos',
//     season: 'Temporada 2023',
//     year: 2023,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
//   },
//   {
//     id: 6,
//     tournamentTitle: 'Torneo +30 HM',
//     season: 'Primer Semestre 2023',
//     year: 2023,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
//   },
//   {
//     id: 7,
//     tournamentTitle: 'Torneo UGAB',
//     season: 'Temporada 2023',
//     year: 2023,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
//   },
//   {
//     id: 8,
//     tournamentTitle: 'Copa Verano',
//     season: 'Temporada 2023',
//     year: 2023,
//     imagePath:
//       'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
//   },
// ];

const pool = require('../db/db');
const tournamentQueries = require('../db/queries/tournaments');

module.exports.getTournaments = async (req, res) => {
  try {
    pool.query(tournamentQueries.getTournaments, (err, results) => {
      if (err) throw new Error('No pudimos cargar los torneos.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.createTournament = async (req, res) => {
  const {
    title,
    season,
    year,
    tournament_image,
    start_date,
    finish_date,
    description,
    previous_edition_id,
    next_edition_id,
  } = req.body;

  try {
    pool.query(
      tournamentQueries.createTournament,
      [
        title,
        season,
        +year,
        tournament_image !== '' ? tournament_image : null,
        start_date !== '' ? start_date : null,
        finish_date !== '' ? finish_date : null,
        description !== '' ? description : null,
        previous_edition_id !== '' ? previous_edition_id : null,
        next_edition_id !== '' ? next_edition_id : null,
      ],
      (err, results) => {
        if (err) throw new Error('No pudimos crear el torneo.');
        res.status(201).send('Torneo creado exitosamente.');
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.getTournamentById = async (req, res) => {
  const id = parseInt(req.params.tournamentId);

  try {
    pool.query(tournamentQueries.getTournamentById, [id], (err, results) => {
      if (err) throw new Error('No pudimos encontrar el torneo.');
      res.status(200).json(results.rows);
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.getTournamentByTitle = async (req, res) => {
  const { tournamentTitle, season } = req.params;

  const formattedTitle = tournamentTitle.split('-').join(' ');
  const formattedSeason = season.split('-').join(' ');

  try {
    pool.query(
      tournamentQueries.getTournamentByTitle,
      [formattedTitle, formattedSeason],
      (err, results) => {
        if (err) throw new Error('No pudimos encontrar el torneo.');
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateTournament = async (req, res) => {
  const id = parseInt(req.params.tournamentId);
  const {
    title,
    season,
    year,
    tournament_image,
    start_date,
    finish_date,
    description,
    previous_edition_id,
    next_edition_id,
  } = req.body;

  try {
    pool.query(tournamentQueries.getTournamentById, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el torneo');

      const tournamentNotFound = !results.rows.length;

      if (tournamentNotFound) {
        res.send('El torneo no existe en la base de datos');
      }

      pool.query(
        tournamentQueries.updateTournament,
        [
          title,
          season,
          +year,
          tournament_image !== '' ? tournament_image : null,
          start_date !== '' ? start_date : null,
          finish_date !== '' ? finish_date : null,
          description !== '' ? description : null,
          previous_edition_id !== '' ? previous_edition_id : null,
          next_edition_id !== '' ? next_edition_id : null,
          id,
        ],
        (err, results) => {
          if (err) throw new Error('No pudimos editar el torneo.');
          res.status(200).send('Torneo editado correctamente.');
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteTournament = async (req, res) => {
  const id = parseInt(req.params.tournamentId);

  try {
    pool.query(tournamentQueries.getTournamentById, [id], (err, results) => {
      if (err) throw new Error('No pudimos buscar el equipo');

      const tournamentNotFound = !results.rows.length;

      if (tournamentNotFound) {
        res.send('El torneo no existe en la base de datos');
      }

      pool.query(tournamentQueries.deleteTournament, [id], (err, results) => {
        if (err) throw new Error('No pudimos eliminar el torneo.');
        res.status(200).send('Torneo eliminado correctamente.');
      });
    });
  } catch (err) {
    res.send(err);
  }
};

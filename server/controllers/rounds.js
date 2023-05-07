const allRounds = [
  {
    id: 1,
    roundName: 'Primer Provincial',
    roundNumber: 1,
    tournament: 'Liga Provincial',
    season: 'Temporada 2023',
    startDate: '2023-03-04',
    finishDate: '2023-03-05',
    location: 'A.S.C.A',
    address: 'Juan José Paso 260',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 2,
    roundName: 'Segundo Provincial',
    roundNumber: 2,
    tournament: 'Liga Provincial',
    season: 'Temporada 2023',
    startDate: '2023-04-01',
    finishDate: '2023-04-02',
    location: 'Braitem',
    address: 'Av. Las Malvinas 9225',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 3,
    roundName: 'Tercer Provincial',
    roundNumber: 2,
    tournament: 'Liga Provincial',
    season: 'Temporada 2023',
    startDate: '2023-05-13',
    finishDate: '2023-05-14',
    location: 'Escuela Dante Alighieri',
    address: 'José Javier Díaz 481',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 4,
    roundName: 'Primera Fecha Marzo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 4,
    startDate: '2023-03-09',
    finishDate: '2023-03-09',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 5,
    roundName: 'Segunda Fecha Marzo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 5,
    startDate: '2023-03-23',
    finishDate: '2023-03-23',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 6,
    roundName: 'Tercera Fecha Marzo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 6,
    startDate: '2023-03-30',
    finishDate: '2023-03-30',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 7,
    roundName: 'Primera Fecha Abril',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 7,
    startDate: '2023-04-13',
    finishDate: '2023-04-13',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 8,
    roundName: 'Segunda Fecha Abril',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 8,
    startDate: '2023-04-20',
    finishDate: '2023-04-20',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 9,
    roundName: 'Tercera Fecha Abril',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 9,
    startDate: '2023-04-30',
    finishDate: '2023-04-30',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 10,
    roundName: 'Clasificatorio a Cat A',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 1,
    startDate: '2023-03-24',
    finishDate: '2023-03-24',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 11,
    roundName: 'Primera Fecha Cat B',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 2,
    startDate: '2023-03-31',
    finishDate: '2023-03-31',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 12,
    roundName: 'Primera Fecha Cat A',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 3,
    startDate: '2023-04-21',
    finishDate: '2023-04-21',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
    imagePath: '/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 13,
    roundName: 'Segunda Fecha Cat B',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 4,
    startDate: '2023-05-05',
    finishDate: '2023-05-05',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 14,
    roundName: 'Primera Fecha Mayo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 10,
    startDate: '2023-05-06',
    finishDate: '2023-05-06',
    location: 'UGAB',
    address: 'Av. Patria 921',
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
];

module.exports.getRoundsOfTheMonth = async (req, res) => {
  try {
    const { month, year } = req.query;

    const roundsOfTheMonth = allRounds.filter(
      (round) =>
        (round.startDate.split('-')[1] === month ||
          round.finishDate.split('-')[1] === month) &&
        (round.startDate.split('-')[0] === year ||
          round.startDate.split('-')[0] === year)
    );

    const sortedRoundsOfTheMatch = roundsOfTheMonth.sort(
      (round1, round2) =>
        +round1.startDate.split('-')[2] - +round2.startDate.split('-')[2]
    );

    res.status(200).json(sortedRoundsOfTheMatch);
  } catch (err) {
    res.send(err);
  }
};

module.exports.getRound = async (req, res) => {
  try {
    const { roundId } = req.params;

    const requiredRound = allRounds.find((round) => round.id === roundId);

    res.status(200).json(requiredRound);
  } catch (err) {
    res.send(err);
  }
};

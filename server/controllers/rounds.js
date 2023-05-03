const allRounds = [
  {
    id: 1,
    title: 'Primer Provincial',
    roundNumber: 1,
    tournament: 'Liga Provincial',
    season: 'Temporada 2023',
    startDate: '2023-03-04',
    finishDate: '2023-03-05',
    location: 'A.S.C.A',
    description:
      'Torneo oficial de la Fe.Co.Te.Me. (Federación Cordobesa de Tenis de Mesa). En cada torneo se disputan las categorías Séptima, Sexta, Quinta, Cuarta, Tercera, Segunda, Primera, SuperFECOTEME, Sub 23, Menores, Maxi 40 A-B y Sub 40. \n Entre las categorías SuperFECOTEME, Primera, Segunda, Tercera, Cuarta, Quinta, Sexta habrá ascensos y descensos (6 ascensos, y una cantidad variable de descensos de acuerdo a la cantidad de inscriptos). Además, habrá 6 ascensos de Séptima a Sexta (aunque no habrá descensos de sexta a séptima). \n El torneo otorga puntaje para el ranking anual, según la siguiente tabla: .',
    address: 'Juan José Paso 260',
  },
  {
    id: 2,
    title: 'Segundo Provincial',
    roundNumber: 2,
    tournament: 'Liga Provincial',
    season: 'Temporada 2023',
    startDate: '2023-04-01',
    finishDate: '2023-04-02',
    location: 'Braitem',
    description:
      'Torneo oficial de la Fe.Co.Te.Me. (Federación Cordobesa de Tenis de Mesa). En cada torneo se disputan las categorías Séptima, Sexta, Quinta, Cuarta, Tercera, Segunda, Primera, SuperFECOTEME, Sub 23, Menores, Maxi 40 A-B y Sub 40. \n Entre las categorías SuperFECOTEME, Primera, Segunda, Tercera, Cuarta, Quinta, Sexta habrá ascensos y descensos (6 ascensos, y una cantidad variable de descensos de acuerdo a la cantidad de inscriptos). Además, habrá 6 ascensos de Séptima a Sexta (aunque no habrá descensos de sexta a séptima). \n El torneo otorga puntaje para el ranking anual, según la siguiente tabla: .',
    address: 'Av. Las Malvinas 9225',
  },
  {
    id: 3,
    title: 'Tercer Provincial',
    roundNumber: 2,
    tournament: 'Liga Provincial',
    season: 'Temporada 2023',
    startDate: '2023-05-13',
    finishDate: '2023-05-14',
    location: 'Escuela Dante Alighieri',
    description:
      'Torneo oficial de la Fe.Co.Te.Me. (Federación Cordobesa de Tenis de Mesa). En cada torneo se disputan las categorías Séptima, Sexta, Quinta, Cuarta, Tercera, Segunda, Primera, SuperFECOTEME, Sub 23, Menores, Maxi 40 A-B y Sub 40. \n Entre las categorías SuperFECOTEME, Primera, Segunda, Tercera, Cuarta, Quinta, Sexta habrá ascensos y descensos (6 ascensos, y una cantidad variable de descensos de acuerdo a la cantidad de inscriptos). Además, habrá 6 ascensos de Séptima a Sexta (aunque no habrá descensos de sexta a séptima). \n El torneo otorga puntaje para el ranking anual, según la siguiente tabla: .',
    address: 'José Javier Díaz 481',
  },
  {
    title: 'Primera Fecha Marzo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 4,
    startDate: '2023-03-09',
    finishDate: '2023-03-09',
    location: 'UGAB',
    address: 'Av. Patria 921',
  },
  {
    title: 'Segunda Fecha Marzo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 5,
    startDate: '2023-03-23',
    finishDate: '2023-03-23',
    location: 'UGAB',
    address: 'Av. Patria 921',
  },
  {
    title: 'Tercera Fecha Marzo',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 6,
    startDate: '2023-03-30',
    finishDate: '2023-03-30',
    location: 'UGAB',
    address: 'Av. Patria 921',
  },
  {
    title: 'Primera Fecha Abril',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 7,
    startDate: '2023-04-13',
    finishDate: '2023-04-13',
    location: 'UGAB',
    address: 'Av. Patria 921',
  },
  {
    title: 'Segunda Fecha Abril',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 8,
    startDate: '2023-04-20',
    finishDate: '2023-04-20',
    location: 'UGAB',
    address: 'Av. Patria 921',
  },
  {
    title: 'Tercera Fecha Abril',
    tournament: 'Torneo UGAB',
    season: 'Temporada 2023',
    roundNumber: 9,
    startDate: '2023-04-30',
    finishDate: '2023-04-30',
    location: 'UGAB',
    address: 'Av. Patria 921',
  },
  {
    title: 'Clasificatorio a Cat A',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 1,
    startDate: '2023-03-24',
    finishDate: '2023-03-24',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
  },
  {
    title: 'Primera Fecha Cat B',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 2,
    startDate: '2023-03-31',
    finishDate: '2023-03-31',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
  },
  {
    title: 'Primera Fecha Cat A',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 3,
    startDate: '2023-04-21',
    finishDate: '2023-04-21',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
  },
  {
    title: 'Segunda Fecha Cat B',
    tournament: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    roundNumber: 4,
    startDate: '2023-05-05',
    finishDate: '2023-05-05',
    location: 'Hermau',
    address: 'Luis A. Brown 1451',
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

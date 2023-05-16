const allTournaments = [
  {
    id: 1,
    tournamentTitle: 'Liga Provincial',
    season: 'Temporada 2022',
    year: 2022,
    imagePath:
      'url(/images/tournaments_images/torneo_+30_hermau_primer_semestre_2023.jpg',
  },
  {
    id: 2,
    tournamentTitle: 'Liga de Equipos',
    season: 'Temporada 2022',
    year: 2022,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 3,
    tournamentTitle: 'Supercopa de Clubes',
    season: 'Temporada 2023',
    year: 2023,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 4,
    tournamentTitle: 'Liga Provincial',
    season: 'Temporada 2023',
    year: 2023,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',

    description:
      'Torneo oficial de la Fe.Co.Te.Me. (Federación Cordobesa de Tenis de Mesa). En cada torneo se disputan las categorías Séptima, Sexta, Quinta, Cuarta, Tercera, Segunda, Primera, SuperFECOTEME, Sub 23, Menores, Maxi 40 A-B y Sub 40. \n Entre las categorías SuperFECOTEME, Primera, Segunda, Tercera, Cuarta, Quinta, Sexta habrá ascensos y descensos (6 ascensos, y una cantidad variable de descensos de acuerdo a la cantidad de inscriptos). Además, habrá 6 ascensos de Séptima a Sexta (aunque no habrá descensos de sexta a séptima). \n El torneo otorga puntaje para el ranking anual, según la siguiente tabla: .',
  },
  {
    id: 5,
    tournamentTitle: 'Liga de Equipos',
    season: 'Temporada 2023',
    year: 2023,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 6,
    tournamentTitle: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    year: 2023,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 7,
    tournamentTitle: 'Torneo UGAB',
    season: 'Temporada 2023',
    year: 2023,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
  {
    id: 8,
    tournamentTitle: 'Copa Verano',
    season: 'Temporada 2023',
    year: 2023,
    imagePath:
      'url(/images/tournaments_images/liga_de_equipos_temporada_2023.jpg',
  },
];

module.exports.getTournaments = async (req, res) => {
  try {
    res.status(200).json(allTournaments);
  } catch (err) {
    res.send(err);
  }
};

module.exports.getTournament = async (req, res) => {
  try {
    const { tournamentTitle, season } = req.params;

    const requiredTournament = allTournaments.find(
      (tournament) =>
        tournament.tournamentTitle.toLowerCase().split(' ').join('-') ===
          tournamentTitle &&
        tournament.season.toLowerCase().split(' ').join('-') === season
    );

    res.status(200).json(requiredTournament);
  } catch (err) {
    res.send(err);
  }
};

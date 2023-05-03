const allTournaments = [
  {
    id: 1,
    title: 'Liga Provincial',
    season: 'Temporada 2022',
    year: 2022,
  },
  {
    id: 2,
    title: 'Liga de Equipos',
    season: 'Temporada 2022',
    year: 2022,
  },
  {
    id: 3,
    title: 'Supercopa de Clubes',
    season: 'Temporada 2022',
    year: 2022,
  },
  {
    id: 4,
    title: 'Liga Provincial',
    season: 'Temporada 2023',
    year: 2023,
  },
  {
    id: 5,
    title: 'Liga de Equipos',
    season: 'Temporada 2023',
    year: 2023,
  },
  {
    id: 6,
    title: 'Torneo +30 HM',
    season: 'Primer Semestre 2023',
    year: 2023,
  },
  {
    id: 7,
    title: 'Torneo UGAB',
    season: 'Temporada 2023',
    year: 2023,
  },
  {
    id: 8,
    title: 'Copa Verano',
    season: 'Temporada 2023',
    year: 2023,
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
    const { tournamentId } = req.params;
    const requiredTournament = allTournaments.find(
      (tournament) => tournament.id === tournamentId
    );
    res.status(200).json(requiredTournament);
  } catch (err) {
    res.send(err);
  }
};

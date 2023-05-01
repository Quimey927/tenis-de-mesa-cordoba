const allTournaments = [
  {
    title: 'Provinciales',
    season: 'Temporada 2023',
    id: 'provinciales-temporada-2023',
    year: 2023,
    number: 1,
  },
  {
    title: 'Liga de Equipos',
    season: 'Temporada 2023',
    id: 'liga-de-equipos-temporada-2023',
    year: 2023,
    number: 2,
  },
  {
    title: 'Torneo +30 Hermau',
    season: 'Primer Semestre 2023',
    id: 'torneo-+30-hermau-primer-semestre-2023',
    year: 2023,
    number: 3,
  },
  {
    title: 'Torneo UGAB',
    season: 'Temporada 2023',
    id: 'torneo-ugab-temporada-2023',
    year: 2023,
    number: 4,
  },
  {
    title: 'Provinciales',
    season: 'Temporada 2022',
    id: 'provinciales-temporada-2022',
    year: 2022,
  },
  {
    title: 'Liga de Equipos',
    season: 'Temporada 2022',
    id: 'liga-de-equipos-temporada-2022',
    year: 2022,
  },
];

module.exports.getCurrentTournaments = async (req, res) => {
  try {
    const currentTournaments = allTournaments.filter(
      (tournament) => tournament.year === 2023
    );
    res.status(200).json(currentTournaments);
  } catch (err) {
    res.send(err);
  }
};

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

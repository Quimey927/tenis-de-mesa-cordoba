const allRounds = [
  {
    title: 'Primer Provincial',
    tournament: 'Provinciales - Temporada 2023',
    month: 2,
    year: 2023,
    days: [22, 23],
  },
  {
    title: 'Segundo Provincial',
    tournament: 'Provinciales - Temporada 2023',
    month: 3,
    year: 2023,
    days: [19, 20],
  },
  {
    title: '1ra fecha Marzo',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 2,
    year: 2023,
    days: [7],
  },
  {
    title: '2ra fecha Marzo',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 2,
    year: 2023,
    days: [21],
  },
  {
    title: '1ra fecha Abril',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 3,
    year: 2023,
    days: [8],
  },
  {
    title: '2ra fecha Abril',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 3,
    year: 2023,
    days: [22],
  },
  {
    title: '1ra fecha Cat A',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 3,
    year: 2023,
    days: [3],
  },
  {
    title: '1ra fecha Cat B',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 3,
    year: 2023,
    days: [10],
  },
  {
    title: '2ra fecha Cat A',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 4,
    year: 2023,
    days: [13],
  },
  {
    title: '2ra fecha Cat B',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 4,
    year: 2023,
    days: [20],
  },
];

module.exports.getRoundsOfTheMonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const roundsOfTheMonth = allRounds.filter(
      (round) => round.month === +month && round.year === +year
    );
    res.status(200).json(roundsOfTheMonth);
  } catch (err) {
    res.send(err);
  }
};

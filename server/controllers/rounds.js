const allRounds = [
  {
    title: 'Primer Provincial',
    tournament: 'Provinciales - Temporada 2023',
    month: 2,
    year: 2023,
    days: [18, 19],
    location: 'A.S.C.A',
    weekDays: ['Sábado', 'Domingo'],
  },
  {
    title: 'Segundo Provincial',
    tournament: 'Provinciales - Temporada 2023',
    month: 3,
    year: 2023,
    days: [22, 23],
    location: 'Braitem',
    weekDays: ['Sábado', 'Domingo'],
  },
  {
    title: '1ra fecha Marzo',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 2,
    year: 2023,
    days: [9],
    location: 'UGAB',
    weekDays: ['Jueves'],
  },
  {
    title: '2ra fecha Marzo',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 2,
    year: 2023,
    days: [23],
    location: 'UGAB',
    weekDays: ['Jueves'],
  },
  {
    title: '1ra fecha Abril',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 3,
    year: 2023,
    days: [6],
    location: 'UGAB',
    weekDays: ['Jueves'],
  },
  {
    title: '2ra fecha Abril',
    tournament: 'Torneo UGAB - Temporada 2023',
    month: 3,
    year: 2023,
    days: [20],
    location: 'UGAB',
    weekDays: ['Jueves'],
  },
  {
    title: '1ra fecha Cat A',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 3,
    year: 2023,
    days: [7],
    location: 'Hermau',
    weekDays: ['Viernes'],
  },
  {
    title: '1ra fecha Cat B',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 3,
    year: 2023,
    days: [21],
    location: 'Hermau',
    weekDays: ['Viernes'],
  },
  {
    title: '2ra fecha Cat A',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 4,
    year: 2023,
    days: [12],
    location: 'Hermau',
    weekDays: ['Viernes'],
  },
  {
    title: '2ra fecha Cat B',
    tournament: 'Torneo +30 Miguel - Primer Semestre 2023',
    month: 4,
    year: 2023,
    days: [19],
    location: 'Hermau',
    weekDays: ['Viernes'],
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

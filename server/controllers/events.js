module.exports.getCurrentEvents = async (req, res) => {
  try {
    const currentEvents = [
      {
        title: 'Provinciales',
        season: 'Temporada 2023',
        id: 1,
      },
      {
        title: 'Liga de Equipos',
        season: 'Temporada 2023',
        id: 2,
      },
      {
        title: 'Torneo +30 Hermau',
        season: 'Primer Semestre 2023',
        id: 3,
      },
      {
        title: 'Torneo UGAB',
        season: '2023',
        id: 4,
      },
    ];

    res.status(200).json(currentEvents);
  } catch (err) {
    res.send(err);
  }
};

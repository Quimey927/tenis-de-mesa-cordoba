module.exports.getCurrentEvents = async (req, res) => {
  try {
    const currentEvents = [
      {
        title: 'Provinciales',
        season: 'Temporada 2023',
      },
      {
        title: 'Liga de Equipos',
        season: 'Temporada 2023',
      },
      {
        title: 'Torneo +30 Hermau',
        season: 'Primer Semestre 2023',
      },
    ];

    res.status(200).json(currentEvents);
  } catch (err) {
    res.send(err);
  }
};

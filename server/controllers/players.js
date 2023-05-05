const allPlayers = [
  {
    id: 1,
    name: 'Quimey Mata',
    club: 'Dante Alighieri',
  },
  {
    id: 2,
    name: 'Marcelo Gianoboli',
    club: 'Hermau',
  },
];

module.exports.getPlayers = async (req, res) => {
  try {
    res.status(200).json(allPlayers);
  } catch (err) {
    res.send(err);
  }
};

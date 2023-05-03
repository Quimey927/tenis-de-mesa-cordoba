export const getTournamentDays = (rounds) => {
  const tournamentDays = [];

  if (rounds.length > 0) {
    rounds.forEach((round) => {
      let startDay = round.startDate.split('-')[2];
      let finishDay = round.finishDate.split('-')[2];

      tournamentDays.push(+startDay);
      if (startDay !== finishDay) {
        tournamentDays.push(+finishDay);
      }
    });
  }

  return tournamentDays;
};

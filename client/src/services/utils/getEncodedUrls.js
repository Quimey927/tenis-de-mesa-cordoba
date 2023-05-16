export const getEncodedTournamentUrl = (tournament, season) => {
  const tournamentTitleUrl = tournament.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentUrl = `${tournamentTitleUrl}/${tournamentSeasonUrl}`;
  return tournamentUrl;
};

export const getEncodedRoundUrl = (tournament, season, round) => {
  const tournamentRoundUrl = round.toLowerCase().split(' ').join('-');
  const tournamentTitleUrl = tournament.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const roundUrl = `${tournamentRoundUrl}/${tournamentTitleUrl}/${tournamentSeasonUrl}`;
  return roundUrl;
};

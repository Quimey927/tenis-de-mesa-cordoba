export const getEncodedTournamentUrl = (tournament, season) => {
  const tournamentTitleUrl = tournament.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentUrl = `${tournamentTitleUrl}/${tournamentSeasonUrl}`;
  return tournamentUrl;
};

export const getEncodedRoundUrl = (tournament, season, round) => {
  const tournamentTitleUrl = tournament.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentRoundUrl = round.toLowerCase().split(' ').join('-');
  const roundUrl = `${tournamentTitleUrl}/${tournamentSeasonUrl}/${tournamentRoundUrl}`;
  return roundUrl;
};

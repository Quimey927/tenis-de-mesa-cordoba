export const getEncodedTournamentUrl = (tournament, season) => {
  const tournamentTitleUrl = tournament.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentUrl = `${tournamentTitleUrl}-${tournamentSeasonUrl}`;
  return tournamentUrl;
};

export const getHyphenedTournamentPath = (tournament, season) => {
  const tournamentTitlePath = tournament.toLowerCase().split(' ').join('_');
  const tournamentSeasonPath = season.toLowerCase().split(' ').join('_');
  const tournamentPath = `${tournamentTitlePath}_${tournamentSeasonPath}`;
  return tournamentPath;
};

export const getEncodedRoundUrl = (tournament, season, round) => {
  const tournamentTitleUrl = tournament.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentRoundUrl = round.toLowerCase().split(' ').join('-');
  const roundUrl = `${tournamentTitleUrl}-${tournamentSeasonUrl}-${tournamentRoundUrl}`;
  return roundUrl;
};

export const getHyphenedRoundPath = (tournament, season, round) => {
  const tournamentTitlePath = tournament.toLowerCase().split(' ').join('_');
  const tournamentSeasonPath = season.toLowerCase().split(' ').join('_');
  const tournamentRoundPath = round.toLowerCase().split(' ').join('_');
  const roundPath = `${tournamentTitlePath}_${tournamentSeasonPath}_${tournamentRoundPath}`;
  return roundPath;
};

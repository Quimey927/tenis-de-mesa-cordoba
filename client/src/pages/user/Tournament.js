import { useLoaderData } from 'react-router-dom';

import Tournament from '../../components/Tournament/Tournament';
import { getTournament } from '../../api/index';

const TournamentPage = () => {
  const tournament = useLoaderData();

  return <Tournament tournament={tournament} />;
};

export default TournamentPage;

export async function loader({ params }) {
  const { tournamentTitle, season } = params;
  return getTournament(tournamentTitle, season);
}

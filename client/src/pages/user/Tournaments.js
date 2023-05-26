import { useLoaderData } from 'react-router-dom';

import TournamentsList from '../../components/Tournaments/TournamentsList';
import { getTournaments } from '../../api/index';

const TournamentsPage = () => {
  const tournaments = useLoaderData();

  return <TournamentsList tournaments={tournaments} />;
};

export default TournamentsPage;

export async function loader() {
  return getTournaments();
}
